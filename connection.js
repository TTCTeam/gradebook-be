import mysql from "mysql";
const mysqlConnection = mysql.createConnection({
  host: "bqmsqseyyydiotyhhfek-mysql.services.clever-cloud.com",
  user: "unzrsxhwbzilvfts",
  password: "XGtarIY3D5E2REbBtc2C",
  database: "bqmsqseyyydiotyhhfek",
  multipleStatements: true,
});

export default mysqlConnection;
