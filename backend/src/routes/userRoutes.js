import express from 'express';
import {
  connectUserToTemple,
  getUsers,
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post(
  '/connect-temple/:templeId',
  authenticate,
  connectUserToTemple
);

userRouter.route('/').get(getUsers);

export default userRouter;
