import db from '../../../db/db.js';
import Sequelize from 'sequelize';
import Course from '../courseModel.js';

const Assignment = db.define(
  'Assignment',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    point: Sequelize.INTEGER,
    order: Sequelize.INTEGER,
  },
  {
    timestamps: false,
    underscored: true
  }
);

Assignment.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Assignment, { as: 'assignments' });

export default Assignment;