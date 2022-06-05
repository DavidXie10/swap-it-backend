const nodemailer = require("nodemailer");
const getTransporter = function () {
    let transporter;
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        },
    });
    return transporter;
};

/*
// Send email example

exports.sendRecoveryCodeEmail = async (userEmail, randomToken, ) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "ci0137@psgfanclubcr.com",
        to: userEmail,
        subject: "Su código de recuperación",
        text: `Utilice este código para recuperar su contraseña: ${randomToken}`,
        html: `Utilice este código para recuperar su contraseña: <strong>${randomToken}</strong>`,
    });
};
*/