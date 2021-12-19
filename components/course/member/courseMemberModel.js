import Sequelize from "sequelize";
import Course from "../courseModel.js";
import User from "../../users/userModel.js";
import db from "../../../db/db.js";

const CourseMember = db.define(
  'CourseMember',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: Sequelize.INTEGER
  },
  {
    timestamps: false,
    underscored: true
  }
);

User.belongsToMany(Course, { through: CourseMember, as: 'courses', foreignKey: 'userId' });
Course.belongsToMany(User, { through: CourseMember, as: 'members', foreignKey: 'courseId' });

export default CourseMember;