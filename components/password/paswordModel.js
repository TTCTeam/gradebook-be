import Sequelize from "sequelize";
import db from "../../db/db.js";
import User from "../users/userModel.js";

const Password = db.define(
  'Password', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  expiredDate: Sequelize.DATE,
  userId: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: false,
  underscored: true
}
);

User.hasOne(Password);
Password.belongsTo(User,{foreignKey:'userId'});
export default Password;