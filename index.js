import express, { application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysqlConnection from "./connection.js";
import classes from "./components/classes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use("/", cors());

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connect to MySQL");
  } else {
    console.log(err);
  }
});

app.use("/classes", classes);

app.get("/", (req, res) => {
  res.send("SUCCESS");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
