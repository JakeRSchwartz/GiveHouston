import { RequestHandler } from 'express';
import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { DI } from '../middleware/di';
import { Event } from '../entities/event.entity';
import { Skill } from '../entities/skill.entity';
import { Tags } from '../entities/tags.entity';
import { toUtcMidnight } from '../utils/utcMidnight';

export const getAllEvents: RequestHandler = async (req, res) => {
  try {
    const em = DI.orm.em.fork();
    const events = await em.find('Event', {});
    const today = toUtcMidnight(new Date);


    const upComingEvents = events.filter(
      (event: any) => new Date(event.date) >= today
    );
    res.status(200).json(upComingEvents);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getEvent: RequestHandler = async (req, res) => {
  try {
    const em = DI.orm.em.fork();
    const { id } = req.params;
    const event = await em.findOne(Event, { id });
    res.status(200).json(event);
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

  if (newSkills.length) await em.persistAndFlush(newSkills);

  return [...existingSkills, ...newSkills];
};

const getOrCreateTags = async (
  em: EntityManager<IDatabaseDriver<Connection>>,
  tagNames: string[]
) => {
  if (!tagNames.length) return [];

  const existingTags = await em.find(Tags, { name: { $in: tagNames } });
  const existingTagNames = new Set(existingTags.map((tag: Tags) => tag.name));

  const newTags = tagNames
    .filter(name => !existingTagNames.has(name))
    .map(name => em.create(Tags, { name }));

  if (newTags.length) await em.persistAndFlush(newTags);

  return [...existingTags, ...newTags];
};
export const createEvent: RequestHandler = async (req, res) => {
  try {
    const em = DI.orm.em.fork();
    const { title, description, date, urgency, location, time } = req.body;
    const skills = Array.isArray(req.body.skills) ? req.body.skills : [];
    const tags = Array.isArray(req.body.tags) ? req.body.tags : [];


    if (!title || !description || !date || !urgency || !location || !time || !skills.length || !tags.length) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // check if event already exists
    const eventExists = await em.findOne
    (Event, { title, date, location, time });
    if (eventExists) {
        res.status(401).json({ message: 'Event already exists' });
        return;
        }

    // Store image in local file (if provided)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Create event
    const event = em.create(Event, {
      title,
      description,
      date,
      urgency,
      location,
      time,
      image: imageUrl
    });

    // Fetch or create skills
    const eventSkills = await getOrCreateSkills(em, skills);
    event.skills.set(eventSkills);

    // Fetch or create tags
    const eventTags = await getOrCreateTags(em, tags);
    event.tags.set(eventTags);

    // Save everything in one operation
    await em.persistAndFlush(event);

    res.status(201).json(event);
    return;
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }
};
