import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import templeRoutes from './src/routes/templeRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import homePageRoutes from './src/routes/homePageRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';

import { sequelize } from './src/config/database.js';
import './src/models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/temples', templeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/user', userRoutes);
app.use('/api/homepage', homePageRoutes);
app.use('/api/contact', contactRoutes);
console.log(
  express.static(path.join(__dirname, 'uploads'))
);
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  console.log('Database connected.');
  app.listen(PORT, () =>
    console.log(
      `Server running at http://localhost:${PORT}`
    )
  );
});
