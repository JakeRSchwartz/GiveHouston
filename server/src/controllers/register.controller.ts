import { RequestHandler } from 'express';
import { User } from '../entities/user.entity';
import bcrypt from 'bcrypt';
import { Availability } from '../entities/availability.entity';

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const em = req.app.locals.orm.em.fork(); 
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
      (d:Availability) => d.date.toISOString().split('T')[0]
    );

    //  Determine which dates need to be created
    const newDates = availabilityDates.filter(
      (date:Date) => !existingDateStrings.includes(date.toISOString().split('T')[0])
    );

    //  Create new Availability entries for non-existing dates
    const newAvailabilities = newDates.map((date:Date) =>
      em.create(Availability, { date: new Date(date) })
    );

    //  Persist new availability records (if any)
    if (newAvailabilities.length > 0) {
      await em.persistAndFlush(newAvailabilities);
    }

    //  Merge both existing and newly created availability records
    const allAvailabilities = [...existingAvailabilities, ...newAvailabilities];

    // Create a new user with valid availability
    const user = em.create(User, {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address1,
      address2,
      city,
      state,
      zip,
      skills,
      preferences,
      availability: allAvailabilities
    });

    // 🔹 Persist the user
    await em.persistAndFlush(user);

    res.status(201).send('User registered successfully');
    return;
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).send('An unknown error occurred');
    return;
  }
};

