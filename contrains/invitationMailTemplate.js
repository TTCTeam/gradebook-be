import { MemberRoles } from './course.js';

export default function invitationMailTemplate(courseName, role, invitation) {
  return `
    <div style="padding: 10px; background-color: #003375">
      <div style="padding: 10px; background-color: white;">
        <h4 style="color: #0085ff">Here is your invitation to join the class ${courseName} as a ${role === MemberRoles.LECTURER ? "lecturer" : "student"}.</h4>
        <p style="color: black">Invitation link: ${invitation.invitationLink}</p>
        <p style="color: black">This link will be expired at ${invitation.expiredDate}.</p>
      </div>
    </div>
  `;
}
