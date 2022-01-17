import InMemorySessionStore from './sessionStore.js';
import { nanoid } from 'nanoid';
import CourseMember from '../components/course/member/courseMemberModel.js';

const sessionStore = new InMemorySessionStore();

let socketIO;

function configNotificationSocket(io) {
  socketIO = io;
  io.use((socket, next) => {
    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
      const session = sessionStore.findSession(sessionId);
      if (session) {
        socket.sessionId = sessionId;
        socket.userId = session.userId;
        return next();
      }
    }
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      return next(new Error("invalid userId"));
    }
    socket.sessionId = nanoid();
    socket.userId = userId;
    socket.isNewSession = true;
    next();
  });

  io.on("connection", async (socket) => {
    // persist session
    sessionStore.saveSession(socket.sessionId, {
      userId: socket.userId,
      connected: true,
    });

    if (socket.isNewSession) {
      // emit session details
      socket.emit("session", {
        sessionId: socket.sessionId,
        userId: socket.userId,
      });
    }

    // join the "userId" room
    socket.join(socket.userId);

    // find all courses of user
    const courses = await CourseMember.findAll({ where: { userId: socket.userId } });

    for (const course of courses) {
      // join the "{courseId}-{role}" room
      const room = `${course.courseId}-${course.role}`;
      socket.join(room);
      socket.emit('test', room);
    }
  });
}

export { socketIO, configNotificationSocket };
