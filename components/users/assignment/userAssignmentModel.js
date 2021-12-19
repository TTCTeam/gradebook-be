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
    point: Sequelize.INTEGER
  },
  {
    timestamps: false,
    underscored: true
  }
);

/* Assignment.belongsToMany(CourseMember, { through: Assignment, as: 'students'});
CourseMember.belongsToMany(Assignment, { through: UserAssignment, as:'submissions'}); */

export default UserAssignment;