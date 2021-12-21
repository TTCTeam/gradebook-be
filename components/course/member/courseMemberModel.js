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
    role: Sequelize.INTEGER,
    studentId:Sequelize.INTEGER,
    fullname: Sequelize.STRING
  },
  {
    timestamps: false,
    underscored: true
  }
);

User.belongsToMany(Course, { through: CourseMember, as: 'courses', foreignKey: 'userId' });
Course.belongsToMany(User, { through: CourseMember, as: 'members', foreignKey: 'courseId' });

CourseMember.belongsTo(Course);
Course.hasMany(CourseMember,{as:'students'});

CourseMember.belongsTo(User);
User.hasMany(CourseMember);

export default CourseMember;