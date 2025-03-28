const nodemailer = require("nodemailer");

const sendMail = (name, email, emailToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: '"DressMore" <support@dressmore.com>',
    to: email,
    subject: "You have successfully registered to  the DressMore",
    html: `
      <p>Hello ${name},</p>
      <h3>Thank you for registering.</h3>
      <p>If you did not registerd this, please ignore this email.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendMail;
