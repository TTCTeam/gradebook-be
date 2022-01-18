import gradeReviewService from './gradeReviewService.js';

export const getGradeReviewsOfCourse = async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req;
  const reviews = await gradeReviewService.getAllByCourseIdAndUserId(courseId, userId);
  res.status(200).json(reviews);
};

export const getGradeReviewById = async (req, res) => {
  const { gradeReviewId } = req.params;
  const review = await gradeReviewService.getGradeReviewById(gradeReviewId);
  res.status(200).json(review);
};

export const createGradeReview = async (req, res) => {
  const { courseId } = req.params;
  const gradeReview = req.body;
  const review = await gradeReviewService.createGradeReview(courseId, gradeReview);
  res.status(200).json(review);
};
