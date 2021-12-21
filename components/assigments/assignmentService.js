import pkg from 'sequelize';
import { MemberRoles } from "../../contrains/course.js";
import Assignment from "../course/assignment/assignmentModel.js";
import Course from "../course/courseModel.js";
import courseService from '../course/courseService.js';
import CourseMember from "../course/member/courseMemberModel.js";

const { Op } = pkg;

const upsertModel = async (Model, newRecord, condition) => {
  Model.findOne({ where: condition }).then(
    function (record) {
      if (record) {
        return record.update(newRecord);
      }
      return Model.create(newRecord);
    }
  )
}

const upsertCourseMemberAndUserAssignmentl = async (newRecord, condition, assignments) => {
  CourseMember.findOne({ where: condition }).then(
    function (record) {
      if (record) {
        return record.update(newRecord);
      }
      else {
        CourseMember.create(newRecord).then(
          function (newMem) {
            newMem.setAssignments(assignments,
              { 
                through: { point: null } 
              }
            );
          }
        );
      }
    }
  )
}

async function uploadStudentListWithStudentIdAndFullname(courseId, studentList) {
  if (studentList && courseId) {
    const course = await courseService.getCourseById(courseId);
    const assignments = await course.getAssignments();
    await studentList.forEach(student => {
      upsertCourseMemberAndUserAssignmentl(
        {
          studentId: student.studentId,
          fullname: student.fullname,
          role: MemberRoles.STUDENT,
          courseId
        },
        {
          courseId,
          studentId: student.studentId
        },
        assignments
      )
    });
  }
}

async function getAllUserAssginment(courseId) {
  return CourseMember.findAll({
    where: {
      courseId,
      role: MemberRoles.STUDENT
    },
    attributes: ['studentId', 'fullname']
  });
}

async function getAssignmentsByAssignmentId(assignmentId) {
  const assignment = await Assignment.findOne({ where: { id: assignmentId } });

  const courseMembers = await assignment.getStudents({
    attributes: ['studentId', 'fullname']
  });
  console.log(courseMembers, 'members');
  return courseMembers;
}

async function getCourseGradeBoard(courseId) {
  const course = await Course.findOne({ where: { id: courseId } });
  let members = await course.getStudents({
    where: {
      role: MemberRoles.STUDENT,
      studentId: {
        [Op.not]: null
      }
    }
  });

  let membersResult = members.map(member => ({
    id: member.id,
    studentId: member.studentId,
    fullname: member.fullname,
    assignments: []
  }))

  for (const index in members) {
    await members[index].getSubmissions({
      attributes: ['id', 'point']
    }).then(
      function (assignments) {
        membersResult[index].assignments = assignments ? assignments : [];
      }
    )

  }

  return membersResult;
}

async function uploadAssignmentListbyAssignmentField(assignmentId, studentList) {
  if (assignmentId && studentList) {

    const assignment = await Assignment.findOne({ where: { id: assignmentId } });

    await studentList.forEach(student => {
      CourseMember.findOne({ where: { studentId: student.studentId, courseId: assignment.courseId } }).then(
        function (member) {
          if (member) {
            //we need to check existed and update UserAssignment record here before add new record
            member.addSubmission(assignment,
              {
                through: { point: student.point }
              }
            )
          }
        }
      )
    })
  }
}

export default {
  uploadStudentListWithStudentIdAndFullname,
  getAllUserAssginment,
  getAssignmentsByAssignmentId,
  getCourseGradeBoard,
  uploadAssignmentListbyAssignmentField
}