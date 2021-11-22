import jsonwebtoken from 'jsonwebtoken';
const { TokenExpiredError } = jsonwebtoken;
import Course from '../course/courseModel.js';
import Role, { STUDENT, TEACHER } from "../roles/roleModel.js";
import User from '../users/userModel.js';
import { serect } from "./auth.config.js";

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({
      message: "Unauthorized! Access token was expired."
    });
  }
}

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jsonwebtoken.verify(token, serect, (err, decoded) => {

    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });

  return res.status(401).send({
    message: "Unauthorized!"
  });
}

export const assignUserToCourse = async (req, res, next) => {
  const { userId, courseId, role: roleStr } = req.body;

  console.log(userId, 'userId');
  console.log(courseId, 'dd');
  console.log(roleStr, 'role');
  if (userId && courseId && roleStr) {
    const user = await User.findOne({ where: { id: userId } });
    const course = await Course.findOne({ where: { id: courseId } });

    let userCourses = await course.getUsers({ where: { id: user.id } });
    const role = await Role.findOne({ where: { name: roleStr } });

    const userCourse = userCourses[0].UserCourse;
    const newUser = await userCourse.setRole(role);
    res.status(200).send(newUser);

  } else {
    res.status(403).send({
      message: "Invalid request!"
    })
  }

}

export const isTecher = async (req, res, next) => {
  const { userId, courseId } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });
    const course = await Course.findOne({ where: { id: courseId } });

    const userCourses = await course.getUsers({ where: { id: user.id } });
    const userCourse = userCourses[0].UserCourse;

    const userRole = await userCourse.getRole();

    if (userRole.name === TEACHER) {
      next();
    }
    else {
      res.status(403).send({
        message: "Teacher is require!"
      });
    }
  } catch (err) {
    res.status(403).send({
      message: err.message
    });
  }

  return;

}