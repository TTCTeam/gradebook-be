import Sequelize from 'sequelize';
import db from '../../../db/db.js';
import Course from "../courseModel.js";

const Invitation = db.define(
  'Invitation',
  {
    id: {
      type: Sequelize.CHAR(21),
      primaryKey: true,
    },
    role: Sequelize.INTEGER,
    isDisposable: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    expiredDate: Sequelize.DATE
  },
  {
    timestamps: false,
    underscored: true,
  }
);

Invitation.belongsTo(Course, { foreignKey: 'courseId' });

export default Invitation;
