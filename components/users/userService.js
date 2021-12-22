import CourseMember from "../course/member/courseMemberModel.js";
import User from "../users/userModel.js";

export async function findUserById(userId) {
  return await User.findByPk(userId);
}

export async function findUserByEmail(email) {
  if (email) {
    return User.findOne({ where: { email: email } });
  }
}

export async function findUserByUsername(username) {
  if (username) {
    return User.findOne({ where: { username: username } });
  }

}

export async function createUser(newUser) {
  return User.create({
    username: newUser.username,
    email: newUser.email,
    password: newUser.password,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
  });
}

export async function updateUser(newUser) {
  return await User.update({
    username: newUser.username,
    email: newUser.email,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
  }, { where: { id: newUser.userId } })
}

/* export async function mapStudentToTheirAssignment(oldStudentId, newStudentId, userId) {
  await CourseMember.findOne({
    where: { studentId: oldStudentId }
  }).then(
    function (oldMember) {
      oldMember.update({ userId: null });
    }
  );

  await CourseMember.findOne({
    where: { studentId: newStudentId }
  }).then(
    function (newMember) {
      newMember.update({ userId: userId });
    }
  )

} */