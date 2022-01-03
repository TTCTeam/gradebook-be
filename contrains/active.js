export function mailActivateTemplate(user, activate) {
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
    <h4 >Welcome, ${user.lastname}! Gradebook is HCMUS's e-learning system to start using you need to activate your account by clicking on the link before expiring time below </h4>
    <p style="color: black">Activation link: ${activate.activationLink}</p>
    <p style="color: black">This link will be expired at ${activate.expiredDate}.</p>
  </div>
</div>
  `;
}

export const ACTIVATE_ACCOUNT_EXPIRED_TIME = 3;

export const ACTIVATE_MAIL_SUBJECT = 'Please confirm your email address'