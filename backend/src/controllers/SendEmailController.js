import transporter from "../config/email";

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
