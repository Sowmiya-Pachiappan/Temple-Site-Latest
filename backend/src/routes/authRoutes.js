import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  register,
  login,
} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', expressAsyncHandler(register));
authRouter.post('/login', expressAsyncHandler(login));

export default authRouter;
