export function mailRenewPasswordTemplate(passwordInfor) {
  return `
  <div style="padding: 10px; background-color: #003375">
  <div style="padding: 10px; background-color: white;">
  <div style="text-align-last: center">
    <img
        src="https://res.cloudinary.com/dlhibqzwf/image/upload/v1641114624/language_gzlruz.png"
        style= "width: 10%; height: 10%; justify-content: center"
        alt="brand"
      />
      <h2 style="color: #0085ff">Welcome to Gradebook</h2>
  </div>
    <h4 >Welcome, ${passwordInfor.user.lastname}! Gradebook is HCMUS's e-learning system to make a new password you only need click on the link before expiring time below </h4>
    <p style="color: black">Change password here: ${passwordInfor.link}</p>
    <p style="color: black">This link will be expired at ${passwordInfor.expiredDate}.</p>
  </div>
</div>
  `;
}

export const PASSWORD_CHANGE_EXPIRED_TIME = 1;

export const PASSWORD_CHANGE_MAIL_SUBJECT = 'Re-new your pasword'