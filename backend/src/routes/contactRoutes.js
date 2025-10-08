import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { sendContactMessage } from '../controllers/contactController.js';

const contactRouter = express.Router();

contactRouter
  .route('/')
  .post(authenticate, sendContactMessage);

export default contactRouter;
