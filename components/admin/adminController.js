import jsonwebtoken from 'jsonwebtoken';
import { EXPIRY, secret } from '../auth/auth.config.js';
import adminService from "./adminService.js";

export const getAllCourses = async (req, res) => {
  const courses = await adminService.getAllCourses();
  res.status(200).json(courses);
};

export const getAllUsers = async (req, res) => {
  const users = await adminService.getAllUsers();
  res.status(200).json(users);
};

export const getAllAdmins = async (req, res) => {
  const admins = await adminService.getAllAdmins();
  res.status(200).json(admins);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await adminService.getUserById(userId);
  res.status(200).json(user);
};

export const getAdminById = async (req, res) => {
  const { adminId } = req.params;
  const admin = await adminService.getAdminById(adminId);
  res.status(200).json(admin);
};

export const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  const course = await adminService.getCourseById(courseId);
  res.status(200).json(course);
};

export const createAdmin = async (req, res) => {
  const admin = req.body;
  try {
    const addedAdmin = await adminService.createAdmin(admin);
    res.status(201).json(addedAdmin);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export const updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const userInfo = req.body;
  const affectedRows = await adminService.updateUserInfo(userId, userInfo);
  res.status(200).send(affectedRows);
}

export const adminSignin = async (req, res) => {
  const { username } = req.body;
  const admin = await adminService.findAdminByUsername(username);
  if (!admin) {
    res.status(400).send({
      message: "Failed! Your account coudn't be found in database."
    });
  }

  const token = jsonwebtoken.sign({ id: admin.id }, secret, {
    algorithm: 'HS256',
    expiresIn: EXPIRY //10s
  });

  res.status(200).send({
    ...admin,
    token: token,
    expiresIn: EXPIRY,
  });
}
