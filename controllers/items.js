const jwt = require('jsonwebtoken');
const { items, findItemById, findItemsByCategory, findUserById } = require("../utils/constants");

exports.getAllItems = (req, res) => {
    try {
        res.json(items);
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al cargar el catálogo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}

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

exports.getItem = (req, res) => {
    try {
        const item = findItemById(req.params.id);
        if(!item){
            res.status(404).send('Producto no encontrado');
            return;
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al cargar el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}

exports.getItemsByCategory = (req, res) => {
    try {
        const category = req.params.categoryId;
        if(category == 0)
            res.json(items);
        else {
            const itemsByCategory = findItemsByCategory(category);
            res.json(itemsByCategory);
        }
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al cargar los artículos. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}

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

exports.deleteItem = (req, res) => {
    try {
        // TODO: change to find item by item id
        //const itemId = req.params.id;
        //const exists = findItemById(itemId);
        const exists = true;
        if (exists){
            res.status(204).send();
        }else{
            res.status(404).send('El item que se quiere eliminar no se encuentra.');
        }
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al eliminar el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
};