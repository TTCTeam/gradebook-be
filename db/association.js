import  Sequelize from "sequelize";
import Course from "../components/course/courseModel.js";
import Role from "../components/roles/roleModel.js";
import User from "../components/users/userModel.js";
import db from "./db.js";

const UserCourse = db.define(
  'UserCourse',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

User.belongsToMany(Course, { through: UserCourse });
Course.belongsToMany(User, { through: UserCourse });
UserCourse.belongsTo(User);
UserCourse.belongsTo(Course);
Course.hasMany(UserCourse);
User.hasMany(UserCourse);


UserCourse.belongsTo(Role);

export default UserCourse;