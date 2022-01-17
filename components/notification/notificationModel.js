import Sequelize from 'sequelize';
import db from '../../db/db.js';
import User from '../users/userModel.js';

const Notification = db.define(
  'Notification',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    courseId: Sequelize.INTEGER
  },
  {
    timestamps: true,
    underscored: true
  }
);

Notification.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Notification, { as: 'notifications' });

export default Notification;
