const jwt = require('jsonwebtoken');
const { findUserById } = require("../utils/constants");

exports.createNewItem = (req, res) => {
    try {
        const userPayload = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.id;
        const user = findUserById(userId);

        res.status(200).json({
            message: 'Nuevo item creado exitosamente.',
            item: {
                idItem: 31,
                ownerUserId: userId,
                ownerFullName: user.fullName,
                ...userPayload,
            }
        })
    } catch (error) {
        res.status(500).send('Error interno del servidor: ' + error);
    }
};