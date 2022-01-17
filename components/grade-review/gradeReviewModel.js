import db from '../../db/db.js';
import Sequelize from 'sequelize';
import UserAssignment from '../users/assignment/userAssignmentModel.js';
import Course from '../course/courseModel.js';

const GradeReview = db.define(
  'GradeReview',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    expectedPoint: {
      type: Sequelize.INTEGER,
    },
    explanation: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
    underscored: true
  }
);

GradeReview.belongsTo(UserAssignment, {foreignKey: 'userAssignmentId'});
GradeReview.belongsTo(Course, {foreignKey: 'courseId'});
Course.hasMany(GradeReview, {as: 'gradeReviews', foreignKey: 'courseId'})

export default GradeReview;