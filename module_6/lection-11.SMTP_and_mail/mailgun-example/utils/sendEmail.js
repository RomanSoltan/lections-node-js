import formData from "form-data";
import Mailgun from "mailgun.js";
import "dotenv/config";

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: MAILGUN_API_KEY,
});

// const data = {
//   to: ["sixako1841@agiuse.com"],
//   subject: "Hello",
//   text: "Testing some Mailgun awesomness!",
//   html: "<h1>Testing some Mailgun awesomness!</h1>",
// };

export const sendEmail = (data) => {
  const email = { ...data, from: "Roberto Carlos romabandit88@gmail.com" };
  return mg.messages.create(MAILGUN_DOMAIN, email);
};

// якщо вилетить помилка, то з нею розбирається той, хто робив запит
