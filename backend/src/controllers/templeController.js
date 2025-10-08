import asyncHandler from 'express-async-handler';
import Temple from '../models/templeModel.js';
import User from '../models/userModel.js';
import { sendTempleCreateEmail } from '../utils/sendEmail.js';
import UserTemple from '../models/userTempleModel.js';
import { Op } from 'sequelize';

export const createTemple = asyncHandler(
  async (req, res) => {
    try {
      const {
        mandirName,
        dietyName,
        address,
        district,
        state,
        pincode,
        phoneCode,
        phoneNumber,
        managedBy,
        mapLink,
        description,
        creatorEmail,
      } = req.body;

      const temple = await Temple.create({
        mandirName,
        dietyName,
        address,
        district,
        state,
        pincode,
        phoneCode,
        phoneNumber,
        managedBy,
        mapLink,
        description,
        creatorEmail,
        isVerified: false,
      });

      const admins = await User.findAll({
        where: { role: 'admin' },
      });

      const emailPromises = admins.map(
        async (admin) =>
          await sendTempleCreateEmail({
            to: admin.email,
            subject:
              'New Temple Submission - Verification Needed 🙏',
            intro: `A new temple "${temple.mandirName}" has been submitted for verification.`,
            instructions:
              'Click the button below to verify the temple:',
            buttonText: 'Verify Temple',
            buttonLink: `${process.env.FRONTEND_URL}/admin/temples/verify/${temple.id}`,
          })
      );

      await Promise.all(emailPromises);

      res.status(201).send({
        message: 'Temple is created successfully',
        temple,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Error creating temple' });
    }
  }
);

export const getTemples = asyncHandler(async (req, res) => {
  try {
    const temples = await Temple.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.send({ temples });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export const getVerifiedTemples = asyncHandler(
  async (req, res) => {
    try {
      const temples = await Temple.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          isVerified: true,
        },
      });
      res.send({ temples });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  }
);

export const getTempleById = asyncHandler(
  async (req, res) => {
    try {
      const temple = await Temple.findByPk(req.params.id);

      if (!temple) {
        return res
          .status(404)
          .send({ message: 'Temple not found' });
      }

      return res.status(200).send({ temple });
    } catch (error) {
      console.error('Error fetching temple:', error);
      return res
        .status(500)
        .send({ message: 'Error fetching temple' });
    }
  }
);

export const updateTemple = asyncHandler(
  async (req, res) => {
    try {
      const temple = await Temple.findByPk(req.params.id);
      if (!temple) {
        res
          .status(404)
          .send({ message: 'Temple not found' });
      }

      const fields = [
        'mandirName',
        'dietyName',
        'address',
        'district',
        'state',
        'pincode',
        'phoneCode',
        'phoneNumber',
        'managedBy',
        'mapLink',
        'description',
      ];

      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          temple[field] = req.body[field];
        }
      });

      const updated = await temple.save();
      res.send({
        message: 'Temple is updated successfully',
        temple: updated,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Failed to update temple' });
    }
  }
);

export const deleteTemple = asyncHandler(
  async (req, res) => {
    try {
      const temple = await Temple.findByPk(req.params.id);
      if (!temple) {
        res
          .status(404)
          .send({ message: 'Temple not found' });
      }
      await temple.destroy();
      res.send({ message: 'Temple deleted successfully' });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Failed to delete temple' });
    }
  }
);

export const verifyTemple = asyncHandler(
  async (req, res) => {
    try {
      console.log(req.user);

      const temple = await Temple.findByPk(req.params.id);

      if (!temple) {
        res
          .status(404)
          .send({ message: 'Temple not found' });
      }

      temple.isVerified = true;

      const { dataValues } = await temple.save();
      console.log(dataValues);
      if (dataValues.creatorEmail) {
        await sendTempleCreateEmail({
          to: dataValues.creatorEmail,
          subject: 'Your Temple Has Been Verified',
          intro: `Your temple "${dataValues.mandirName}" has been successfully verified!`,
          instructions:
            'Click below to visit your dashboard:',
          buttonText: 'View My Temple',
          buttonLink: `${process.env.FRONTEND_URL}/my-temples`,
        });
      }

      res.status(200).send({
        message: 'Temple verified successfully',
        temple,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Failed to verify temple' });
    }
  }
);

export const connectTemple = asyncHandler(
  async (req, res) => {
    try {
      const connectUserWithTemple = await UserTemple.create(
        {
          templeId: req.body.templeId,
          userId: req.body.userId,
        }
      );

      res.status(201).send({
        message: 'User successfully connected to temple.',
        data: connectUserWithTemple,
      });
    } catch (error) {
      console.error(
        'Error connecting user to temple:',
        error
      );
      res.status(500).send({ message: error.message });
    }
  }
);

export const getNotConnectedTemples = asyncHandler(
  async (req, res) => {
    try {
      const userId = req.user.id;
      const connectedTemples = await UserTemple.findAll({
        where: { userId },
        attributes: ['templeId'],
      });

      const templeIdList = connectedTemples.map(
        (item) => item.templeId
      );

      const temples = await Temple.findAll({
        where: {
          isVerified: true,
          id: {
            [Op.notIn]: templeIdList.length
              ? templeIdList
              : [0],
          },
        },
      });

      return res.status(200).send({ temples });
    } catch (error) {
      console.error(
        'Error fetching unconnected temples:',
        error
      );
      return res
        .status(500)
        .send({ message: error.message });
    }
  }
);

export const getMyTemples = async (req, res) => {
  try {
    const userId = req.user.id;

    const temples = await Temple.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
          attributes: [],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).send({ temples });
  } catch (error) {
    res.status(500).send({
      message: 'Failed to fetch your temples',
      error: error.message,
    });
  }
};
