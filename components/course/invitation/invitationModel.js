import Sequelize from 'sequelize';
import db from '../../../db/db.js';

const Invitation = db.define(
  'Invitation',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    courseId: Sequelize.INTEGER,
    invitationCode: Sequelize.UUID,
    expiredDate: Sequelize.DATE
  },
  {
    timestamps: false,
    underscored: true,
  }
);

export default Invitation;
