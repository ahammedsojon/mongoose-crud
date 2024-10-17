import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'ahammedsojon000@gmail.com',
      pass: 'Go to your google manage account, click on security tab from left sidenav, and click on 2-step verification and generate a password and put it here (2-step verificaiton compulsory)',
    },
  });
  await transporter.sendMail({
    from: 'ahammedsojon000@gmail.com', // sender address
    to, // list of receivers
    subject: 'Please change your password in 10 mins!', // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  });
};

export default sendEmail;
