import sequelize from 'sequelize';
import db from '../../db/db.js';

const Course = db.define(
  'Course',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: sequelize.STRING,
    lecturer: sequelize.STRING,
    description: sequelize.STRING,
  },
  {
    tableName: 'COURSE',
    timestamps: false
  }
);

export default Course;
