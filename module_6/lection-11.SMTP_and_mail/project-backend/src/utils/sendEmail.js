import nodemailer from 'nodemailer';
import 'dotenv/config';
import { getEnvVar } from './getEnvVar.js';

const user = getEnvVar('UKR_NET_EMAIL');
const pass = getEnvVar('UKR_NET_PASSWORD');

const nodemailerConfig = {
  // адреса поштового серверу, до якого підключаємось
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  //   email до якого підключаємось
  auth: {
    user,
    pass,
  },
};

// обєкт, який відпрвляє email
const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (data) => {
  const email = { ...data, from: user };
  return transport.sendMail(email);
};
