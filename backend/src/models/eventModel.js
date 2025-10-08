import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Event = sequelize.define(
  'Event',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    templeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Temples',
        key: 'id',
      },
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Event;
