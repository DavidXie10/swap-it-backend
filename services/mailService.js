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

exports.sendExchangeItemsProposalEmail = async (emailDetails, userTo, userFrom) => {
    const transporter = getTransporter();
    
    await transporter.sendMail({
        from: "ci0137@psgfanclubcr.com",
        to: userTo.email,
        subject: 'Swap it: Nueva propuesta de intercambio',
        text: `¡Hola ${userTo.fullName}! 
        Has recibido una nueva propuesta de intercambio de ${userFrom.fullName}. 
        Te está ofreciendo: ${emailDetails.proposedItemsNames} por tu ${emailDetails.receiveItemName}. 
        Si te interesa, contáctale al: ${userFrom.email} o ${userFrom.phoneNumber}.`,
        html: `<h1>¡Hola ${userTo.fullName}!</h1>
        <p>Has recibido una nueva propuesta de intercambio de ${userFrom.fullName}. </p>
        <p>Te está ofreciendo: <strong>${emailDetails.proposedItemsNames}</strong> por tu <strong>${emailDetails.receiveItemName}</strong>. </p>
        <p>Si te interesa, contáctale al: ${userFrom.email} o ${userFrom.phoneNumber}.</p>`,
    });
};