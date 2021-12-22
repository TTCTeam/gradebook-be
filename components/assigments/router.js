import express from 'express';
import {
  publicAssignment,
  getAssignmentBoard,
  getStudentList,
  getUserAssignmentListInAssignmentId,
  uploadAssignmentsListByAssignmentId,
  uploadStudentList,
} from './assignmentController.js';
const assigmentsRouter = express.Router();

assigmentsRouter.get('/', (req, res) => {
  res.send({ message: 'lalala' });
});
assigmentsRouter.get('/public/:assignmentId', publicAssignment);
assigmentsRouter.get('/:courseId', getAssignmentBoard);
assigmentsRouter.put('/:courseId/studentlist', uploadStudentList);
assigmentsRouter.get('/:courseId/studentlist', getStudentList);
assigmentsRouter.put(
  '/:assignmentId/:courseId',
  uploadAssignmentsListByAssignmentId
);
assigmentsRouter.get(
  '/:assignmentId/:courseId',
  getUserAssignmentListInAssignmentId
);

export default assigmentsRouter;
