const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // My Gmail address
        pass: process.env.EMAIL_PASSWORD // My Gmail password
    }
});

const sendEmail = async(to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
    }
};

module.exports = { sendEmail };