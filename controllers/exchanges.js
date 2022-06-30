const jwt = require('jsonwebtoken');
const { sendExchangeItemsProposalEmail } = require('../services/mailService');
const { findUserById } = require("../utils/constants");

exports.exchangeItems = async (req, res) => {
    // #swagger.tags = ['Exchanges']
    /*  
    #swagger.description = 'Send an email with a proposal to exchange the items selected by one user for a specific item of another user'
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Exchange items proposal information',
        schema: { $ref: '#/definitions/ExchangeItems' }
    } */
    /* 
    #swagger.responses[401] = {
        description: 'Unauthorized',
        schema: {
            message: 'Datos no válidos'
        }
    } 
    #swagger.responses[204] = {
        description: 'No Content. Successfully sent the email for exchange proposal',
    } 
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al intentar enviar el correo de propuesta de intercambio. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 
    #swagger.responses[422] = {
        description: 'Unprocessable Entity',
        schema: {
            "body": {
                "userToId": 1,
                "proposedItemsNames": "",
                "receiveItemName": "Computadora personal"
            },
            "error": "Los items propuestos son obligatorios."
        }
    }

    */
    try {
        const userPayload = req.body;
        const userTo = findUserById(userPayload.userToId);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userFrom = findUserById(decodedToken.id);

        if (!userTo) {
            res.status(401).json({message: 'Datos no válidos'});
            return;
        }
        
        await sendExchangeItemsProposalEmail(userPayload, userTo, userFrom);

        res.status(204).send();
    } catch (error) {
        res.status(500).send('Ocurrió un error al intentar enviar el correo de propuesta de intercambio. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error);
    }
};