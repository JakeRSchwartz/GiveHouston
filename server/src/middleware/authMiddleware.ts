import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'supersecretrefreshkey';

// Extend Request type to include `user`
export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  const refreshToken = req.cookies.refreshToken || req.headers.authorization?.split(' ')[1];

  if (!refreshToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify((refreshToken), JWT_REFRESH_SECRET) as { id: string };
    req.user = { id: decoded.id }; 
    return next(); 
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }
};
