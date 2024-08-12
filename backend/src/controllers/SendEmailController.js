import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'oswaldtanlee44@gmail.com',
    pass: 'deop unux mshb umie',
  }
});

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'oswaldtanlee44@gmail.com',
    to,
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};
