import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const HomePage = sequelize.define(
  'HomePage',

  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default HomePage;
