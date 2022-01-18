import Comment from './commentModel.js';

async function getAllByGradeReviewId(gradeReviewId) {
  return Comment.findAll({ where: { gradeReviewId } });
}

async function createComment(gradeReviewId, comment) {
  return Comment.create({...comment, gradeReviewId});
}

export default {getAllByGradeReviewId, createComment};