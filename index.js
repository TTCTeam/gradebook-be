import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import dotenv from 'dotenv';
import courseRouter from "./components/course/router.js";
import authRouter from "./components/auth/router.js";
import initializePassport from "./components/passport/index.js";
import userRouter from "./components/users/router.js";
import { verifyToken } from './components/auth/authJwt.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

initializePassport(app, passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use("/", cors());


app.use('/courses', verifyToken, courseRouter);
app.use('/auth', authRouter);
app.use('/user',verifyToken, userRouter);

app.get("/", (req, res) => {
  res.send("SUCCESS");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
