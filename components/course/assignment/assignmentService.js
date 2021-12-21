import Course from '../courseModel.js';
import courseService from '../courseService.js';
import CourseMember from '../member/courseMemberModel.js';
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
  const newAssignment = await Assignment.create({ ...assignment, courseId })

  const courseMembers = await CourseMember.findAll({ where: { courseId } });

  newAssignment.setStudents(courseMembers, {
    through: {
      point: null
    }
  })
  return newAssignment;

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