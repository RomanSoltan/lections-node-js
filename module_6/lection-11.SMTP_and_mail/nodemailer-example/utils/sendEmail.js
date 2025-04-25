import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  // адреса поштового серверу, до якого підключаємось
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  //   email до якого підключаємось
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

// обєкт, який відпрвляє email
const transport = nodemailer.createTransport(nodemailerConfig);

// const data = {
//   to: "sixako1841@agiuse.com",
//   subject: "Hello",
//   text: "Hello",
//   html: "<h1>Hello my friend!</h1>",
// };

export const sendEmail = (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  return transport.sendMail(email);
};
