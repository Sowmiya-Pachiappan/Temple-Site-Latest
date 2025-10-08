import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { sequelize } from '../config/database.js';
import User from '../models/userModel.js';

dotenv.config();

const seedAdminUser = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const email = 'admin@gmail.com';

    const existingAdmin = await User.findOne({
      where: { email },
    });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      'admin123',
      10
    );

    const admin = await User.create({
      name: 'Super Admin',
      title: 'Mr.',
      role: 'admin',
      email,
      password: hashedPassword,
      mobileCode: '',
      mobileNumber: '',
    });

    console.log('Admin created successfully:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('Failed to create admin:', error.message);
    process.exit(1);
  }
};

seedAdminUser();
