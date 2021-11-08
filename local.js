import mysql from "mysql";
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "classroom",
  multipleStatements: true,
});


export default mysqlConnection;