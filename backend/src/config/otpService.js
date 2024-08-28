import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // gunakan penyedia email sesuai kebutuhan
  auth: {
    user: 'oswaldtanlee44@gmail.com',
    pass: 'deop unux mshb umie',
  }
});

export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: 'oswaldtanlee44@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};
