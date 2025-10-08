import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './userModel.js';
import Temple from './templeModel.js';

const UserTemple = sequelize.define(
  'UserTemple',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
    },
    templeId: {
      type: DataTypes.INTEGER,
      references: { model: 'Temples', key: 'id' },
    },
  },
  {
    timestamps: true,
  }
);

export default UserTemple;
