import jsonwebtoken, { decode } from 'jsonwebtoken';
const { TokenExpiredError } = jsonwebtoken;
import { serect } from "./auth.config.js";
import { OAuth2Client } from 'google-auth-library';

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({
      message: "Unauthorized! Access token was expired."
    });
  }else{
    return res.status(401).send({
      message: "Unauthorized!"
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
  console.log(token);

  jsonwebtoken.verify(token, serect,{ algorithms: 'HS256' }, (err, decoded) => {

    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    console.log(decoded.id,'userId');
    next();
  });
}

export const verifyGoogleToken = async (req, res, next) => {
  const idToken = req.headers["x-goog-iap-jwt-assertion"];

  const oAuth2Client = new OAuth2Client(process.env.GCLIENT_ID);

  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GGCLINET_ID
    });

    const user = ticket.getPayload();
    console.log(user);

    req.body = {
      email: user.email,
      username: null,
      password: null,
      firstname: user.given_name,
      lastname: user.family_name
    };
    next();

  } catch (err) {

    res.status(401).send({
      message: "Unauthorized! Access token was expired."
    });
  }

}
