const jwt = require('jsonwebtoken');
const { findUserById } = require("../utils/constants");

exports.createNewItem = (req, res) => {
    try {
        const userPayload = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.id;
        const user = findUserById(userId);

        res.status(201).json({
            message: 'Nuevo item creado exitosamente.',
            item: {
                idItem: 31,
                ownerUserId: userId,
                ownerFullName: user.fullName,
                ...userPayload,
            }
        })
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al crear el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
};

exports.editItem = (req, res) => {
    try {
        const userPayload = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.id;
        const user = findUserById(userId);

        // TODO: change to find item by item id
        const itemId = req.params.id;

        res.status(200).json({
            message: 'Item editado exitosamente.',
            item: {
                ownerUserId: userId,
                ownerFullName: user.fullName,
                ...userPayload,
            }
        });
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al editar el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
};