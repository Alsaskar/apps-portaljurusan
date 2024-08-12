import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oswaldtanlee44@gmail.com',
    pass: 'deop unux mshb umie',
  },
});

export default transporter;
