import Invitation from './invitationModel.js';

async function findByCourseIdAndInvitationCode(courseId, invitationCode) {
  return Invitation.findOne(
    { where: { courseId, invitationCode } }
  );
}

async function create(invitation) {
  return Invitation.create(invitation);
}

export default { findByCourseIdAndInvitationCode, create };

