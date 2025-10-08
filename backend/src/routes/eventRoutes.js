import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsByTemple,
} from '../controllers/eventController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const eventRouter = express.Router();

eventRouter
  .route('/')
  .post(authenticate, createEvent)
  .get(getAllEvents);
eventRouter
  .route('/:id')
  .get(getEventById)
  .put(authenticate, updateEvent)
  .delete(authenticate, deleteEvent);
eventRouter.get('/temple/:templeId', getEventsByTemple);

export default eventRouter;
