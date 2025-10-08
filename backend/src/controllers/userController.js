import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Temple from '../models/templeModel.js';

export const connectUserToTemple = asyncHandler(
  async (req, res) => {
    try {
      const { templeId } = req.params;
      const userId = req.user.id;

      const temple = await User.findByPk(templeId);
      if (!temple) {
        return res
          .status(404)
          .send({ message: 'User not found' });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res
          .status(404)
          .send({ message: 'User not found' });
      }

      await temple.addUser(user);

      res.send({
        message: 'User connected to temple successfully',
      });
    } catch (error) {
      console.error('Connection error:', error);
      res
        .status(500)
        .send({ message: 'Internal server error' });
    }
  }
);

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        role: 'user',
      },
      include: [
        {
          model: Temple,
          attributes: ['mandirName'],
          as: 'familyDevata',
        },
        {
          model: User,
          attributes: ['name', 'email'],
          as: 'Referrer',
        },
      ],
    });

    res.send({ users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: 'Failed to fetch users' });
  }
});
