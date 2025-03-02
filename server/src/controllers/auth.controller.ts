import { DI } from '../middleware/di';
import { RequestHandler } from 'express';
import { User } from '../entities/user.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { __prod__ } from '../constants';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'supersecretrefreshkey';

export const login: RequestHandler = async (req, res) => {
  try {
    const em = DI.orm.em.fork();
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    const user = await em.findOne<User>(User, { email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(404).send('Invalid email or password');
      return;
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '15m'
    });
    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: '7d'
    });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: __prod__,
        maxAge: 1000 * 60 * 15 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: __prod__,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 3 hours
    });
    res.status(200).send('Login successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

export const refreshToken: RequestHandler = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: 'No refresh token provided' });
      return;
    }

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ message: 'Invalid refresh token' });
        return;
      }

      // Generate New Access Token
      const newAccessToken = jwt.sign({ id: (decoded as any).id }, JWT_SECRET, {
        expiresIn: '15m'
      });

      res.cookie('token', newAccessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: __prod__,
        maxAge: 1000 * 60 * 15 // 15 minutes
      });

      res.status(200).json({message: 'Token refreshed'});
      return;
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: __prod__, maxAge: 0 });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: __prod__,
      maxAge: 0
    });

    res.status(200).send('Logout successful');
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
