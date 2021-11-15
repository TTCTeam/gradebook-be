import  Sequelize  from "sequelize";
import db from "../../db/db.js";

const User = db.define(
  'User',
  {
    id:{
      type:Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    username:{
      type:Sequelize.STRING,
    },
    email:{
      type:Sequelize.STRING,
    },
    password:{
      type:Sequelize.STRING,
    }
  }
);

export default User;