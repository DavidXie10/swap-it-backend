const jwt = require('jsonwebtoken');
const { sendExchangeItemsProposalEmail } = require('../services/mailService');
const { findUserById } = require("../utils/constants");

exports.exchangeItems = async (req, res) => {
    try {
        const userPayload = req.body;
        const userTo = findUserById(userPayload.userToId);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userFrom = findUserById(decodedToken.id);

        if (!userTo) {
            res.status(401).send('Datos no válidos');
            return;
        }
        
        await sendExchangeItemsProposalEmail(userPayload, userTo, userFrom);

        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error interno del servidor: ' + error);
    }
};