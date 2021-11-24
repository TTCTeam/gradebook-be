import courseService from './courseService.js';

export const getAllCoursesOfUser = async (req, res) => {
  // const userId = req.user.id;
  const courses = await courseService.getAllCoursesOfUser(1);
  res.status(200).json(courses);
};

export const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  // const userId = req.user.id;
  const course = await courseService.getCourseById(courseId);
  const role = await courseService.getRoleInCourse(courseId, 1);
  if (!course || !role){
    res.status(400).json('The course id is invalid.');
    return;
  }
  res.status(200).json({ course, role });
};

export const getLecturers = async (req, res) => {
  const { courseId } = req.params;
  const lecturers = await courseService.getLecturers(courseId);
  res.status(200).json(lecturers);
}

export const getStudents = async (req, res) => {
  const { courseId } = req.params;
  const students = await courseService.getStudents(courseId);
  res.status(200).json(students);
}

export const createCourse = async (req, res) => {
  const course = req.body;
  // const userId = req.user.id;
  const addedCourse = await courseService.addCourse(course, 1);
  res.status(201).json(addedCourse);
};

export const createInvitation = async (req, res) => {
  const { courseId } = req.params;
  try {
    const invitation = await courseService.createInvitation(courseId);
    res.status(200).json(invitation);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const joinCourse = async (req, res) => {
  const { courseId } = req.params;
  const { invitationId } = req.query;
  const user = { id: 1 };
  try {
    await courseService.joinCourse(courseId, user.id, invitationId);
    res.status(200).send();
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const sendInvitationMail = async (req, res) => {
  const { courseId } = req.params;
  const {emails, role} = req.body;
  const successfulList = await courseService.sendInvitationMail(courseId, emails, role);
  res.status(200).json(successfulList);
};
