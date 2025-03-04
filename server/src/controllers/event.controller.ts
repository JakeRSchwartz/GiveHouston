import { RequestHandler } from 'express';
import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { DI } from '../middleware/di';
import { Event } from '../entities/event.entity';
import { Skill } from '../entities/skill.entity';
import { Tags } from '../entities/tags.entity';
import { toUtcMidnight } from '../utils/utcMidnight';

interface CreateEventRequestBody {
  title: string;
  description: string;
  date: Date;
  urgency: string;
  location: string;
  time: string;
}

export const getAllEvents: RequestHandler = async (req, res) => {
  try {
    const em = DI.orm.em.fork();
    const events = await em.find('Event', {});
    const today = toUtcMidnight(new Date());

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
    const { title, description, date, urgency, location, time } =
      req.body as CreateEventRequestBody;
    const skills = (
      Array.isArray(req.body.skills) ? req.body.skills : []
    ) as string[];
    const tags = (
      Array.isArray(req.body.tags) ? req.body.tags : []
    ) as string[];

    if (
      !title ||
      !description ||
      !date ||
      !urgency ||
      !location ||
      !time ||
      !skills.length ||
      !tags.length
    ) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // check if event already exists
    const eventExists = await em.findOne(Event, {
      title,
      date,
      location,
      time
    });
    if (eventExists) {
      res.status(401).json({ message: 'Event already exists' });
      return;
    }

    // Store image in local file (if provided)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Create event
    const event = em.create(Event, {
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      date,
      urgency: urgency.toUpperCase(),
      location: location.toLowerCase(),
      time: time.toLowerCase(),
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
export const deleteEvent: RequestHandler = async (req, res) => {
  try {
    const em = DI.orm.em.fork();
    const { id } = req.params;
    const event = await em.findOne(Event, { id });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    await em.removeAndFlush(event);
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateEvent: RequestHandler = async (req, res) => {
  const em = DI.orm.em.fork();
  const { id } = req.params;
  const { title, description, date, urgency, location, time } =
    req.body as CreateEventRequestBody;
  const skills = (
    Array.isArray(req.body.skills) ? req.body.skills : []
  ) as string[];
  const tags = (Array.isArray(req.body.tags) ? req.body.tags : []) as string[];

  if (
    !title &&
    !description &&
    !date &&
    !urgency &&
    !location &&
    !time &&
    !skills.length &&
    !tags.length
  ) {
    res.status(400).json({
      message: 'Missing required fields'
    });
    return;
  }
  try {
    const event = await em.findOne(Event, {
      id
    });
    if (!event) {
      res.status(404).json({
        message: 'Event not found'
      });
      return;
    }
    if (title) event.title = title.toLowerCase();
    if (description) event.description = description.toLowerCase();
    if (date) event.date = date;
    if (urgency) event.urgency = urgency.toUpperCase();
    if (location) event.location = location.toLowerCase();
    if (time) event.time = time.toLowerCase();
    if (req.file) event.image = `/uploads/${req.file.filename}`;
    if (skills.length) {
      const eventSkills = await getOrCreateSkills(em, skills);
      event.skills.set(eventSkills);
    }
    if (tags.length) {
      const eventTags = await getOrCreateTags(em, tags);
      event.tags.set(eventTags);
    }
    await em.persistAndFlush(event);
    res.status(200).json({ message: 'Event updated' });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};
