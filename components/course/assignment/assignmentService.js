import courseService from '../courseService.js';
import Assignment from './assignmentModel.js';

async function getAllAssignments(courseId) {
  const course = await courseService.getCourseById(courseId);
  const assignments = await course.getAssignments();
  return assignments.map(assignment => ({
    id: assignment.id,
    name: assignment.name,
    point: assignment.point,
    order: assignment.order,
  }));
}

async function createAssignment(courseId, assignment) {
  return await Assignment.create({ ...assignment, courseId });
}

async function updateOrder(assignments) {
  assignments.forEach((assignment) => {
    Assignment.update({ order: assignment.order }, {
      where: { id: assignment.id }
    });
  });
}

async function editAssignment(assignmentId, assignment) {
  return await Assignment.update(assignment, {
    where: { id: assignmentId }
  });
}

async function deleteAssignment(assignmentId) {
  return await Assignment.destroy({ where: { id: assignmentId } });
}

export default {
  getAllAssignments,
  createAssignment,
  editAssignment,
  deleteAssignment,
  updateOrder
};