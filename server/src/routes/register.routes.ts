import express from 'express';
import { Request, Response } from 'express';
import {registerUser} from '../controllers/register.controller';

const router = express.Router();

router.post('/postUser', registerUser); // Post user to db


export default router;