import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import UserTemple from '../models/userTempleModel.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { email, password, ...restData } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...restData,
      email,
      password: hashedPassword,
      role: req.body.role ?? 'user',
    });
    const userTemple = await UserTemple.create({
      userId: user.dataValues.id,
      templeId: user.dataValues.familyDevataMandir,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.status(201).send({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).send({
      message: 'Registration failed',
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res
        .status(401)
        .send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.send({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
