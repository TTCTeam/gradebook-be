import Sequelize  from "sequelize";
import db from "../../db/db.js";

const Role = db.define(
  'Role',
  {
    id:{
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    name:{
      type:Sequelize.STRING,
    },
  }
);

export default Role;