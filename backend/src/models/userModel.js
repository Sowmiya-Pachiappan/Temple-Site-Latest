import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'user'),
    fatherName: DataTypes.STRING,
    motherName: DataTypes.STRING,
    mobileCode: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memberReference: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    familyDevataMandir: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Temples',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default User;
