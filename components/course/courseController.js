import courseService from './courseService.js';

export const getAllCourses = async (req, res) => {
  const courses = await courseService.getAllCourses();
  res.status(200).json(courses);
};

export const createCourse = async (req, res) => {
  const course = req.body;
  const addedCourse = await courseService.addCourse(course);
  res.status(201).json(addedCourse);
};

export const createInvitation = async (req, res) => {
  const { courseId } = req.params;
  const invitation = await courseService.createInvitation(courseId);
  res.status(200).json(invitation);
};

export const joinCourse = async (req, res) => {
  const { courseId } = req.params;
  const { invitationId } = req.query;
  const isSuccessful = await courseService.joinCourse(courseId, invitationId);
  res.status(200).json(isSuccessful);
};

export const sendInvitationMail = async (req, res) => {
  const emails = req.body;
  const successfulList = await courseService.sendInvitationMail(emails);
  res.status(200).json(successfulList);
};
