import { RequestHandler } from 'express';
import { User } from '../entities/user.entity';
import bcrypt from 'bcrypt';
import { Availability } from '../entities/availability.entity';
import { Collection } from '@mikro-orm/core';
import { Skill } from '../entities/skill.entity';
import { DI } from '../middleware/di';


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
      preferences
    } = req.body;
    console.log('req.body:', req.body);
    const availability = req.body.availability
      ? Array.isArray(req.body.availability)
        ? req.body.availability
        : [req.body.availability]
      : [];

    const skills = req.body.skills
      ? Array.isArray(req.body.skills)
        ? req.body.skills
        : [req.body.skills]
      : [];

    // Default role is 'user'
    const userRole = req.body.role || 'user';

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !city ||
      !state ||
      !zip ||
      !address1
    ) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const existingUser = await em.findOne(User, { email });
    if (existingUser) {
      res.status(409).send('User already exists');
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = em.create(User, {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      address1,
      address2,
      city: city.toLowerCase(),
      state,
      zip,
      preferences,
      role: userRole,
      createdAt: new Date()
    });


    //chop of time from date
    if (availability.length > 0) {
      const availabilityDates: string[] = availability.map(
        (date: string) => date.split('T')[0]
      );

      // See if it already exists
      const existingAvailabilities = await em.find(Availability, {
        date: { $in: availabilityDates }
      });

      //remove time from returned dates to compare next
      const existingDateSet = new Set(
        existingAvailabilities.map(
          avail => avail.date.toISOString().split('T')[0]
        )
      );

      //filter out dates that are not in the existing in the database
      const newAvailabilities = availabilityDates
        .filter((date: string) => !existingDateSet.has(date))
        .map((date: string) => em.create(Availability, { date }));

      // Persist new availability records and add to join table (keeps old values in join table, but will add new pair)
      if (newAvailabilities && newAvailabilities.length > 0) {
        await em.persistAndFlush(newAvailabilities);
        user.availability.add(newAvailabilities);
      }
    }

    const skillNames = skills || [];
    if (skillNames.length > 0) {
      const existingSkills = await em.find(Skill, {
        name: { $in: skillNames }
      });
      // Create a set of existing skill names
      const existingSkillSet = new Set(existingSkills.map(skill => skill.name));

      // Filter out existing skills
      const newSkills = skillNames
        .filter((name: string) => !existingSkillSet.has(name))
        .map((name: string) => em.create(Skill, { name }));

      // Persist new skills and add to join table (keeps old values in join table, but will add new pair)
      if (newSkills && newSkills.length > 0) {
        await em.persistAndFlush(newSkills);
        user.skills.add(newSkills);
      }
    }

    await em.persistAndFlush(user);

    res.status(201).send('Registered successfully');
    return;
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).send('An unknown error occurred');
    return;
  }
};
