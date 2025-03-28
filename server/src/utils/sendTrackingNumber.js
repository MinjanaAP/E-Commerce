const nodemailer = require("nodemailer");

const sendTrackingNumber = (name, email, trackingNumber) => {
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
    from: '"DressMore" <support@fashionhouse.com>',
    to: email,
    subject: "Your order has confirmed",
    text: `
    Hello ${name},
    
    Thank you for placing your order with Fashion House.
    
    Your order has been successfully placed, and the tracking details are as follows:
    
    Tracking Number: ${trackingNumber}
    
    This is an automated message. Please do not reply.
        `,
        html: `
          <html>
          <body>
            <h3>Order Confirmation</h3>
            <pre style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
              
                Customer Name": ${name},
                Email: ${email},
                Tracking Number: ${trackingNumber}
              
            </pre>
            <p>Thank you for shopping with DressMore</p>
            <p>If you have any questions, feel free to contact us.</p>
            <a href="${process.env.FRONTEND_BASE_URL}/contact">Contact us</a>
            <p>Thank you for shopping with DressMore</p>
            <p>This is an automated message. Please do not reply.</p>

          </body>
          </html>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending tracking email:", error);
    } else {
      console.log("Tracking email sent:", info.response);
    }
  });
};

module.exports = sendTrackingNumber;
