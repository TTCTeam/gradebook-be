import Sequelize from "sequelize";
import db from "../../../db/db.js";
import Assignment from "../../course/assignment/assignmentModel.js";
import CourseMember from "../../course/member/courseMemberModel.js";

const UserAssignment = db.define(
  'UserAssignment',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    point: Sequelize.INTEGER,
  },
  {
    timestamps: false,
    underscored: true
  }
);

Assignment.belongsToMany(CourseMember, { through: UserAssignment, as: 'students' });
CourseMember.belongsToMany(Assignment, { through: UserAssignment, as: 'assignments' });

UserAssignment.belongsTo(Assignment);
Assignment.hasMany(UserAssignment, { as: 'submissions', foreignKey: 'assignmentId' });

UserAssignment.belongsTo(CourseMember);
CourseMember.hasMany(UserAssignment, { as: 'submissions', foreignKey: 'courseMemberId' });

export default UserAssignment;