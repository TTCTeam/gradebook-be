import jsonwebtoken from 'jsonwebtoken';
const { TokenExpiredError } = jsonwebtoken;
import { serect } from "./auth.config.js";

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({
      message: "Unauthorized! Access token was expired."
    });
  }
}

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jsonwebtoken.verify(token, serect, (err, decoded) => {

    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });

  return res.status(401).send({
    message: "Unauthorized!"
  });
}
