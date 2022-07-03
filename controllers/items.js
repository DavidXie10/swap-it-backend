const jwt = require('jsonwebtoken');
const { getIgnoreTag } = require('swagger-autogen/src/swagger-tags');
const { items, isItemFromUser, findItemById, findItemsByCategory, findUserById} = require("../utils/constants");

const pageSize = 9;

exports.getAllItems = (req, res) => {
    //router.route('/?page=:pageId').get(getAllItems);
    // #swagger.tags = ['Items']
    try {
        const {page} = req.query;
        if(!page){
            res.status(400).json({message: 'Solicitud incorrecta'});
            return;
        }

        const pagesCount = Math.ceil(items.length / pageSize);
        if(page >= pagesCount){
            res.status(404).json({message: 'No se encuentran los artículos de la página solicitada. Intente con un número de página menor a ' + pagesCount });
            return;
        }

        res.json(items.slice(page * pageSize, (page * pageSize) + pageSize).map(item => item));
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al cargar el catálogo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}

exports.createItem = (req, res) => {
    // #swagger.tags = ['Items']
    /* 
    #swagger.description = 'Create a new item with required information'
    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'The new item information',
            schema: { $ref: '#/definitions/CreateItem' }
        } 
    */
    /* 
    #swagger.responses[201] = {
        description: 'Successfully created a new item',
        schema: {
            "message": "¡Nuevo item creado exitosamente!",
            "item": {
                "itemId": 7,
                "ownerFullName": "David Xie Li",
                "ownerUserId": 1,
                "name": "Cartucho de tinta HP 63",
                "location": 1,
                "acquisitionDate": "2021-12-30",
                "description": "Tengo este cartucho de tinta negra HP 63 que no uso porque cambié de impresora",
                "wishlist": "Cartucho de tinta negra o de algún color HP 65",
                "itemState": 1,
                "category": 2,
                "photoUrls": ["https://ci0137.s3.amazonaws.com/swap-it/uploads/filename.jpg"]
            }
        }
    } 
    #swagger.responses[401] = {
        description: 'Unauthorized. User is not authenticated',
        schema: {
            message: 'Credenciales inválidas'
        }
    } 
    #swagger.responses[422] = {
        description: 'Unprocessable Entity',
        schema: {
            "0body": {
                "location": 1,
                "acquisitionDate": "2021-12-30",
                "description": "Tengo este cartucho de tinta negra HP 63 que no uso porque cambié de impresora",
                "wishlist": "Cartucho de tinta negra o de algún color HP 65",
                "itemState": 1,
                "category": 2,
                "photoUrls": [
                    "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename.jpg"
                ]
            },
            "message": "El nombre del item es un campo obligatorio y debe ser una hilera de caracteres."
        }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al crear el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 

    */
    try {
        const userPayload = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.id;
        const user = findUserById(userId);

        res.status(201).json({
            message: '¡Nuevo item creado exitosamente!',
            item: {
                itemId: 31,
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
    // #swagger.tags = ['Items']
    try {
        const item = findItemById(req.params.id);
        if(!item){
            res.status(404).json({message: 'Item no encontrado'});
            return;
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al cargar el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}

exports.getItemsByCategory = (req, res) => {
    // #swagger.tags = ['Items']
    try {
        const {page} = req.query;
        const category = req.params.categoryId;

        const itemsByCategory = findItemsByCategory(category);
        if(!itemsByCategory.length){
            res.status(404).json({message: 'No se encuentran artículos en la categoría indicada.'});
            return;
        }

        if(!page){
            res.json(itemsByCategory);
        } else {
            const pagesCount = Math.ceil(itemsByCategory.length / pageSize);
            if(page >= pagesCount || page < 0){
                res.status(404).json({message: 'No se encuentran los artículos de la página solicitada. Intente con un número de página mayor o igual a 0 y menor a ' + pagesCount });
                return;
            }

            res.json(itemsByCategory.slice(page * pageSize, (page * pageSize) + pageSize));
        }        
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al cargar los artículos. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}

exports.editItem = (req, res) => {
    // #swagger.tags = ['Items']
    /*  
    #swagger.description = 'Edit the information of an existing item only if you own it'    
    #swagger.parameters['id'] = { description: 'The id of the article for which the information is to be edited' }
    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'The information of the item to be edited',
            schema: { $ref: '#/definitions/EditItem' }
        } 
    */
    /*
    #swagger.responses[200] = {
        description: 'Successfully edited the specified item',
        schema: {
            "message": "Item editado exitosamente.",
            "item": {
                "ownerUserId": 1,
                "ownerFullName": "David Xie Li",
                "name": "Cartucho de tinta HP 63",
                "location": 1,
                "acquisitionDate": "2021-12-30",
                "description": "Este cartucho de tinta negra HP 63 es único en el mundo. No busques más e intercambiemos",
                "wishlist": "Cartucho de tinta negra o de algún color HP 65",
                "itemState": 1,
                "category": 2,
                "photoUrls": [
                    "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename.jpg",
                    "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename2.jpg"
                ]
            }
        }
    } 
    #swagger.responses[401] = {
        description: 'Unauthorized',
        schema: {
            message: 'No está autorizado para editar el item.'
        }
    } 
    #swagger.responses[404] = {
        description: 'The item to be edited does not exist',
        schema: {
            message: "El item que se quiere editar no se encuentra"
        }
    }
    #swagger.responses[422] = {
        description: 'Unprocessable Entity',
        schema: {
            "body": {
                "name": "Cartucho de tinta HP 63",
                "acquisitionDate": "2021-12-30",
                "description": "Este cartucho de tinta negra HP 63 es único en el mundo. No busques más e intercambiemos",
                "wishlist": "Cartucho de tinta negra o de algún color HP 65",
                "itemState": 1,
                "category": 2,
                "photoUrls": [
                    "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename.jpg",
                    "https://ci0137.s3.amazonaws.com/swap-it/uploads/filename2.jpg"
                ]
            },
            "message": "Debe especificar la provincia en la que se encuentra con un número: San José[1], Alajuela[2], Cartago[3], Heredia[4], Guanacaste[5], Puntarenas[6], Limón[7]."
        }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al editar el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 
    */
    try {
        const userPayload = req.body;
        const itemId = req.params.id;
        const item = findItemById(itemId);

        if(!item){
            res.status(404).json({message: 'El item que se quiere editar no se encuentra'});
            return;
        }

        if(!isItemFromUser(req.headers.authorization.split(' ')[1], item.ownerUserId)){
            res.status(401).json({message: 'No está autorizado para editar el item.'});
            return;      
        }

        res.status(200).json({
            message: 'Item editado exitosamente.',
            item: {
                ownerUserId: item.ownerUserId,
                ownerFullName: item.ownerFullName,
                ...userPayload,
            }
        });
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al editar el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
};

exports.deleteItem = (req, res) => {
    // #swagger.tags = ['Items']
    /*  
        #swagger.parameters['id'] = { description: 'The id of the item to be deleted' }
        #swagger.description = 'Delete an existing item if it exists and if you own the item'
    */
    /*
    #swagger.responses[204] = {
        description: 'No Content. Successfully deleted the specified item',
    } 
    #swagger.responses[401] = {
        description: 'Unauthorized',
        schema: {
            message: 'No está autorizado para eliminar el item.'
        }
    } 
    #swagger.responses[404] = {
        description: 'The item to be edited does not exist',
        schema: {
            message: "El item que se quiere eliminar no se encuentra"
        }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al eliminar el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 
    */
    try {
        const itemId = req.params.id;
        const item = findItemById(itemId);
    
        if(!item){
            res.status(404).json({message: 'El item que se quiere eliminar no se encuentra.'});
            return;
        }
    
        if(!isItemFromUser(req.headers.authorization.split(' ')[1], item.ownerUserId)){
            res.status(401).json({message: 'No está autorizado para eliminar el item.'});
            return;      
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al eliminar el artículo. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
};