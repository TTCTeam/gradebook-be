import gradeReviewService from './gradeReviewService.js';

export const getGradeReviewsOfCourse = async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req;
  const reviews = await gradeReviewService.getAllByCourseIdAndUserId(courseId, userId);
  res.status(200).json(reviews);
};
