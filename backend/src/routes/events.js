import express from 'express';
import EventsController from '../controllers/eventsController.js';

const router = express.Router();

// List events with filters and pagination
router.get('/', EventsController.getEvents);

// Featured events
router.get('/featured', EventsController.getFeaturedEvents);

// Latest events
router.get('/latest', EventsController.getLatestEvents);

// Get event by ID
router.get('/:id', EventsController.getEventById);

export default router; 