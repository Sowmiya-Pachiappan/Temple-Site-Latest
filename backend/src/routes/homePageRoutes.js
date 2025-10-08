import express from 'express';
import {
  authenticate,
  authorizeAdmin,
} from '../middlewares/authMiddleware.js';
import {
  getHomePage,
  updateHomePage,
} from '../controllers/homePageController.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const homePageRouter = express.Router();

homePageRouter.route('/').get(getHomePage);

homePageRouter
  .route('/update')
  .put(
    authenticate,
    authorizeAdmin,
    upload.single('image'),
    updateHomePage
  );

export default homePageRouter;
