import Sequelize from "sequelize";
import db from "../../db/db.js";
export const TEACHER = 'TEACHER';
export const STUDENT = 'STUDENT';
const Role = db.define(
  'Role',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    underscored: true
  }
);

(async () => {

  await db.sync();
  await Role.bulkCreate(
    { id: 1, name: TEACHER },
    { id: 2, name: STUDENT }
  )

})();

export default Role;