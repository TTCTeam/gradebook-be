import Sequelize from "sequelize";
import db from "../../db/db.js";

const User = db.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    password:{
      type:Sequelize.STRING,

    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

export default User;