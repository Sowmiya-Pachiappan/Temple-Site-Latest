import asyncHandler from 'express-async-handler';
import { sendContactEmail } from '../utils/sendEmail.js';
import Temple from '../models/templeModel.js';

export const sendContactMessage = asyncHandler(
  async (req, res) => {
    const { name, email, templeId, message } = req.body;

    if (!name || !email || !message || !templeId) {
      return res.status(400).json({
        message:
          'Name, Email, Temple and Message are required.',
      });
    }

    try {
      const temple = await Temple.findByPk(templeId);
      await sendContactEmail({
        name,
        temple,
        email,
        message,
      });

      res.status(200).send({
        message:
          'Message received and email sent. Thank you!',
      });
    } catch (error) {
      console.error('Error in contact form:', error);
      res.status(500).send({
        message: 'Something went wrong. Please try again.',
      });
    }
  }
);
