import adminService from "./adminService.js"

export const getAllCourses = async (req, res) => {
  const courses = await adminService.getAllCourses();
  res.status(200).json(courses);
}

export const getAllUsers = async (req, res) => {
  const users = await adminService.getAllUsers();
  res.status(200).json(users);
}

export const getAllAdmins = async (req, res) => {
  const admins = await adminService.getAllAdmins();
  res.status(200).json(admins);
}