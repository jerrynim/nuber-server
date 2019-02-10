/*메일을 보내는 API 무료는 자기자신에게만 보내기가능 */

import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox12824214b7b540b6b44945a82882ccab.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "tjerry3@naver.com",
    to: "tjerry3@naver.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};
