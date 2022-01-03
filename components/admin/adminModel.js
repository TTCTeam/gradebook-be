import db from '../../db/db.js';
import Sequelize from 'sequelize';

const Admin = db.define(
  'Admin',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,

    },
  },
  {
    timestamps: true,
    underscored: true
  }
);

export default Admin;