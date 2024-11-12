const nodeMailer = require('nodemailer');

const send = async ({ from, to, subject, html }) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: +process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === "true",
            auth: {
                user: process.env.EMAIL_USER_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        await transporter.sendMail({
            from,
            to,
            subject,
            html
        });
    } catch (error) {
        console.log('Email error: ', error);
    }
};

module.exports = {
    send
};
