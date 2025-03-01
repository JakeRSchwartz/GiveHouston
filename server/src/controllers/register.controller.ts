//Post user to db
import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const orm = req.app.locals.orm.fork();
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = orm.em.create(User, {
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
      availability
    });

    // Persist the user to the database
    await orm.em.persistAndFlush(user);

    res.status(201).send('User registered successfully');

  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while registering the user');
  }
};
