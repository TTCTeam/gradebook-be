import Sequelize from "sequelize";
import User from "../users/userModel.js";
import db from "../../db/db.js";

const RefreshToken = db.define('RefreshToken',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    }
  }
  , {
    timestamps: false,
    underscored: true,
  }
);

User.hasOne(RefreshToken);

export default RefreshToken;