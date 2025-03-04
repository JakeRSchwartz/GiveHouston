import express from 'express';
import { getAllEvents, getEvent, createEvent } from '../controllers/event.controller';
import { upload } from '../utils/multer';


const router = express.Router();

router.get('/events', getAllEvents); // Get all events
router.get('/event/:id', getEvent); // Get a single event
router.post('/create-event', upload.single('image'), createEvent); // Create an event


export default router;