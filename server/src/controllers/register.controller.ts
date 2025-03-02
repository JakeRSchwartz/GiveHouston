import { RequestHandler } from 'express';
import { User } from '../entities/user.entity';
import bcrypt from 'bcrypt';
import { Availability } from '../entities/availability.entity';
import { Collection } from '@mikro-orm/core';
import { Skill } from '../entities/skill.entity';
import { DI } from '../middleware/di';
import { v4 as uuidv4 } from 'uuid';



export const registerUser: RequestHandler = async (req, res) => {
  try {
    const em = DI.orm.em.fork();
    const {
      firstName,
      lastName,
      email,
      password,
      address1,
      address2,
      city,
      state,
      zip,
      skills,
      preferences,
      availability
    } = req.body;
    
    // Default role is 'user'
    const userRole = req.body.role || 'user';

    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    //  Check if the user already exists
    const existingUser = await em.findOne(User, { email });
    if (existingUser) {
      res.status(409).send('User already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Convert availability strings to Date objects (only keep YYYY-MM-DD)
    const availabilityDates = availability.map(
      (date: string) => new Date(date.split('T')[0])
    );

    //  Fetch existing availability dates from DB
    const existingAvailabilities = await em.find(Availability, {
      date: { $in: availabilityDates }
    });

    //  Extract only the dates (formatted as YYYY-MM-DD) from existing records
    const existingDateStrings = existingAvailabilities.map(
      (d: Availability) => d.date.toISOString().split('T')[0]
    );

    //  Determine which dates need to be created
    const newDates = availabilityDates.filter(
      (date: Date) =>
        !existingDateStrings.includes(date.toISOString().split('T')[0])
    );

    //  Create new Availability entries for non-existing dates
    const newAvailabilities = newDates.map((date: Date) =>
      em.create(Availability, { date: new Date(date) })
    );

    //  Persist new availability records (if any)
    if (newAvailabilities.length > 0) {
      await em.persistAndFlush(newAvailabilities);
    }

    //  Merge both existing and newly created availability records
    const allAvailabilities = [...existingAvailabilities, ...newAvailabilities];

    const skillNames = skills || [];

    // Find existing skills by name
    const existingSkills = await em.find(Skill, { name: { $in: skillNames } });

    // Extract UUIDs of existing skills
    const existingSkillMap = new Map(
      existingSkills.map(skill => [skill.name, skill])
    );

    // Determine which skills are new
    const newSkillNames = skillNames.filter(
      (name: string) => !existingSkillMap.has(name)
    );

    // Create new skills
    const newSkills = newSkillNames.map((name: string) => {
      const skill = em.create(Skill, { name, id: uuidv4() });
      existingSkillMap.set(name, skill);
      return skill;
    });

    // Save new skills
    if (newSkills.length > 0) {
      await em.persistAndFlush(newSkills);
    }

    // Merge all skills
    const allSkills = [...existingSkills, ...newSkills];

    console.log('allAvailabilities:', allAvailabilities);
    // Create a new user
    const user = em.create(User, {
      firstName: firstName.toLowerCase(),
      lastName : lastName.toLowerCase(),
      email : email.toLowerCase(),
      password: hashedPassword,
      address1,
      address2,
      city,
      state,
      zip,
      preferences,
      role: userRole,
      createdAt: new Date()
    });
    user.availability = new Collection<Availability>(user, allAvailabilities);
    user.skills = new Collection<Skill>(user, allSkills);

    await em.persistAndFlush(user);

    res.status(201).send('Registered successfully');
    return;
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).send('An unknown error occurred');
    return;
  }
};
