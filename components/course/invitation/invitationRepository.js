import Invitation from './invitationModel.js';

async function findByCourseIdAndInvitationId(courseId, invitationId) {
  return Invitation.findOne(
    { where: { id: invitationId, courseId } }
  );
}

async function deleteById(invitationId) {
  return Invitation.destroy(
    { where: { id: invitationId } });
}

export default { ...Invitation, findByCourseIdAndInvitationId, deleteById };

