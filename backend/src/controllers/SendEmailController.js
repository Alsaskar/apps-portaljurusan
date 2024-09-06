import transporter from "../config/email";

export const sendEmail = async (req, res) => {
  const { to, subject, text, fileUrl } = req.body;

  // Define the HTML content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #5f47e8;
          text-align: center;
        }
        p {
          font-size: 16px;
          line-height: 1.5;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          color: #fff;
          background-color: #5f47e8;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
        }
        .btn:hover {
          background-color: #458bf5;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Evaluasi Akademik</h1>
        <p>Halo,</p>
        <p>Berikut adalah evaluasi akademik mahasiswa.</p>
        <p>Anda dapat melihat evaluasi melalui tautan berikut:</p>
        <p><a href="${fileUrl}" class="btn">Lihat Evaluasi</a></p>
        <p>Persentase kehadiran mahasiswa selama semester ini 80%.</p>
        <p>Terima kasih.</p>
        <p>Hormat kami,<br>Tim Akademik</p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};
