import e, { RequestHandler } from 'express';
import { DI } from '../middleware/di';
import { User } from '../entities/user.entity';
import { Availability } from '../entities/availability.entity';
import { Skill } from '../entities/skill.entity';
import { AuthRequest } from '../middleware/authMiddleware';
import {
  EntityManager,
  IDatabaseDriver,
  Connection,
} from '@mikro-orm/core';
import bcrypt from 'bcrypt';

interface UpdateProfileRequestBody {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  password?: string;
  city?: string;
  state?: string;
  zip?: string;
  skills?: string[];
  availability?: string[] | Date[]; 
  preferences?: string; 
}

export const getProfile: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const em = DI.orm.em.fork();
    if (!req.user || !req.user.id) {
      res.status(400).json({ message: 'Unauthorized: Invalid Token' });
      return;
    }
    const id = req.user.id;
    const user = await em.findOne(User, { id });
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    console.log(user);

    res.status(200).json({ message: 'Profile found' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getOrCreateSkills = async (
  em: EntityManager<IDatabaseDriver<Connection>>,
  skillNames: string[]
) => {
  if (!skillNames.length) return [];

  const existingSkills = await em.find(Skill, { name: { $in: skillNames } });
  const existingSkillNames = new Set(
    existingSkills.map((skill: Skill) => skill.name)
  );

  const newSkills = skillNames
    .filter(name => !existingSkillNames.has(name))
    .map(name => em.create(Skill, { name }));

  if (newSkills.length > 0) await em.persistAndFlush(newSkills);

  return [...existingSkills, ...newSkills];
};

const getOrCreateAvailability = async (
  em: EntityManager<IDatabaseDriver<Connection>>,
  availabilityDates: (string | Date)[]
) => {
  if (!availabilityDates.length) return [];

  // Helper function to normalize dates to UTC Midnight
  const toUtcMidnight = (date: string | Date) => {
    const d = new Date(date);
    return new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
    );
  };

  // Fetch existing availability and normalize to date-only format (UTC Midnight)
  const existingAvailability = await em.find(Availability, {
    date: { $in: availabilityDates.map(date => toUtcMidnight(date)) }
  });

  const existingDates = new Set(
    existingAvailability.map(avail => toUtcMidnight(avail.date).toISOString()) // Store as UTC Midnight string
  );

  // Filter new availability and ensure only missing dates are created
  const newAvailability = availabilityDates
    .map(toUtcMidnight)
    .filter(date => !existingDates.has(date.toISOString())) // Compare in consistent format
    .map(date => em.create(Availability, { date }));

  console.log('New Availability:', newAvailability);
  console.log('Existing Availability:', existingAvailability);

  if (newAvailability.length > 0) await em.persistAndFlush(newAvailability);

  return [...existingAvailability, ...newAvailability];
};

export const updateProfile: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const em = DI.orm.em.fork();
    if (!req.user || !req.user.id) {
      res.status(400).json({ message: 'Unauthorized: Invalid Token' });
      return;
    }
    const id = req.user.id;
    const user = await em.findOne(
      User,
      { id },
      { populate: ['skills', 'availability'] }
    );
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    const {
      firstName,
      lastName,
      address1,
      address2,
      password,
      city,
      state,
      zip,
      skills,
      availability,
      preferences
    } = req.body as UpdateProfileRequestBody;

    if (firstName) user.firstName = firstName.toLowerCase();
    if (lastName) user.lastName = lastName.toLowerCase();
    if (address1) user.address1 = address1.toLowerCase();
    if (address2) user.address2 = address2.toLowerCase();
    if (city) user.city = city.toLowerCase();
    if (state) user.state = state.toUpperCase();
    if (zip) user.zip = zip;
    if (preferences) user.preferences = preferences.toLowerCase();

    if (password && !bcrypt.compare(password, user.password)) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (!skills || skills.length === 0) {
      user.skills.removeAll();
    } else {
      const skillsArray = Array.isArray(skills) ? skills : [skills];
      const userSkills = await getOrCreateSkills(em, skillsArray);
      user.skills.set(userSkills);
    }

    if (!availability || availability.length === 0) {
      user.availability.removeAll();
    } else {
      const availabilityArray = Array.isArray(availability)
        ? availability
        : [availability];
      const userAvailability = await getOrCreateAvailability(
        em,
        availabilityArray
      );
      user.availability.set(userAvailability);
    }

    await em.persistAndFlush(user);
    res.status(200).json({ message: 'Profile updated' });
    return;
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }
};
