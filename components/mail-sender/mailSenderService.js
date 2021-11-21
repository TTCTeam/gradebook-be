import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'ttc.coopit@gmail.com',
    pass: 'hcmus234245297'
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});

export async function sendMail(emails, htmlContent) {
  const options = {
    from: 'NQH-Test nodemailer',
    to: emails,
    subject: 'Test Nodemailer',
    text: 'Your text is here',
    html: htmlContent
  };

  const info = await transporter.sendMail(options);
  return info.accepted;
}
