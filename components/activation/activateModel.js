import Sequelize from 'sequelize';
import db from "../../db/db.js";
import User from "../users/userModel.js";

const Activate = db.define(
  'Activate',{
    id: {
      type: Sequelize.CHAR(21),
      primaryKey: true,
    },
    expiredDate: Sequelize.DATE,
  }
  , {
    timestamps: false,
    underscored: true,
  }
)
User.hasOne(Activate);
Activate.belongsTo(User,{ foreignKey: 'userId' });

export default Activate;