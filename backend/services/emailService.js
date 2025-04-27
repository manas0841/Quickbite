const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const sendOrderStatusEmail = async (order, status) => {
  try {
    // Read and compile template
    const filePath = path.join(__dirname, "../templates/orderStatus.hbs");
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);

    const html = template({
      firstName: order.address.firstName,
      orderId: order._id,
      orderStatus: status,
      amount: order.amount,
      items: order.items,
      year: new Date().getFullYear(),
    });

    // Set up transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use Mailgun, SMTP, etc.
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `QuickBite <${process.env.EMAIL_USER}>`,
      to: order.address.email,
      subject: `Order #${order._id} Status Update`,
      html,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = { sendOrderStatusEmail };
