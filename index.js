import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import dotenv from 'dotenv';
import courseRouter from "./components/course/router.js";
import authRouter from "./components/auth/router.js";
import initializePassport from "./components/passport/index.js";
import userRouter from "./components/users/router.js";
import { verifyToken } from './components/auth/authJwt.js';
import assigmentsRouter from "./components/assigments/router.js";
import adminRouter from './components/admin/router.js';
import { configNotificationSocket } from './notificationSocket/notificationSocket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  }
});

initializePassport(app, passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use("/", cors());


app.use('/courses', verifyToken, courseRouter);
app.use('/auth', authRouter);
app.use('/user', verifyToken, userRouter);
app.use('/assignments', verifyToken, assigmentsRouter);
app.use('/admin', adminRouter);

app.get("/", (req, res) => {
  res.send("SUCCESS");
});

configNotificationSocket(io);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



