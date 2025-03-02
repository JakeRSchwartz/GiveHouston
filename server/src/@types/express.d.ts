import { Request } from 'express';
import { User } from '../entities/User'; // Adjust import path

declare module 'express' {
  interface Request {
    user?: User; // Define user property on Request
  }
}
