import 'dotenv/config'
import nodemailer from 'nodemailer'

const URL = process.env.BASE_URL;
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

const createEmail = (email, token) => {
    return {
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Activation Confirmation",
        html:
            "<h3>For Activate Account, click the link bellow</h3>" +
            "<a href='" + URL + "/api/users/activate/" + token + "'>Link Activation</a>",
    };
};

const sendMail = (email, token) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(createEmail(email, token), (err, info) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
};

export { sendMail };