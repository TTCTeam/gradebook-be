import mysqlConnection from "../../connection.js";

export const getClasses = (req, res) => {
  mysqlConnection.query("SELECT * FROM class", (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ err: err });
    }
  });
};

export const createClass = (req, res) => {
  const data = req.body;
  const name = data.name;
  const description = data.description;
  const query = `INSERT INTO class (name,description) VALUES ("${name}","${description}")`;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.status(200).json(description);
    } else {
      res.status(500).json({ err: err });
    }
  });
};
