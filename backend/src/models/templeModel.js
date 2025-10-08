import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Temple = sequelize.define(
  'Temples',
  {
    mandirName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dietyName: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    district: DataTypes.STRING,
    state: DataTypes.STRING,
    pincode: DataTypes.STRING,
    phoneCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    managedBy: DataTypes.ENUM('Private', 'Government'),
    mapLink: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    creatorEmail: DataTypes.STRING,
  },
  { timestamps: true }
);

export default Temple;
