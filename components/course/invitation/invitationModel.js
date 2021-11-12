import Sequelize from 'sequelize';
import db from '../../../db/db.js';

const Invitation = db.define(
  'Invitation',
  {
    id: {
      type: Sequelize.CHAR(21),
      primaryKey: true,
    },
    courseId: Sequelize.INTEGER,
    memberRole: Sequelize.INTEGER,
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

export default Invitation;
