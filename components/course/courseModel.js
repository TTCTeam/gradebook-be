import Sequelize from 'sequelize';
import db from '../../db/db.js';

const Course = db.define(
  'Course',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    lecturer: Sequelize.STRING,
    description: Sequelize.STRING,
  },
  {
    timestamps: true,
    underscored: true
  }
);

export default Course;
