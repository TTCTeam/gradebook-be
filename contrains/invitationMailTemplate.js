export default function invitationMailTemplate(content) {
  return `
    <div style="padding: 10px; background-color: #003375">
      <div style="padding: 10px; background-color: white;">
        <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
        <span style="color: black">${content}</span>
      </div>
    </div>
  `;
}
