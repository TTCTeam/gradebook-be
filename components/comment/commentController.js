import commentService from './commentService.js';

export const getAllCommentByGradeReviewId = async (req, res) => {
  const { gradeReviewId } = req.params;
  const comments = await commentService.getAllByGradeReviewId(gradeReviewId);
  res.status(200).json(comments);
};

export const createComment = async (req, res) => {
  const { courseId, gradeReviewId } = req.params;
  const comment = req.body;
  const { userId } = req;
  const createdComment = await commentService.createComment(courseId, gradeReviewId, comment, userId);
  res.status(201).json(createdComment);
};
