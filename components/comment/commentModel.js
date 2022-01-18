import db from '../../db/db.js';
import Sequelize from 'sequelize';
import GradeReview from '../grade-review/gradeReviewModel.js';

const Comment = db.define(
  'Comment',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
    underscored: true
  }
);

GradeReview.hasMany(Comment, { as: 'comments', foreignKey: 'gradeReviewId' });

export default Comment;