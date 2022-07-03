const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByEmail, findUserById, findItemsByUser } = require('../utils/constants');

exports.loginUser = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.description = 'Login an existing user to use the application. A token is returned with the necessary information to authenticate the user in future requests. The user data is also returned'
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User credentials',
        schema: { $ref: '#/definitions/LoginUser' }
    } */
    /* #swagger.responses[200] = {
            description: 'User successfully logged in into the app',
            schema: {
                id: 1,
                password: "$4f4dgdfdgdbgyvycuvhlrmjgfndgjnfgdfmglfmglñfmlgmgfds88445fsf",
                fullName: "John Doe",
                email: "john@correo.com",
                location: 1,
                phoneNumber: "86808521",
                photoUrl: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTzXP8yS66xjGHKpFXxFA5oSAh0AjA8xPRcU7I88COgApoIfvdk0kenagYFoJhN6u-I",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBdXRoZW50aWNhdGVkIjp0cnVlLCJpYXQiOjE2NTY1Mzg0MzUsImV4cCI6MTY1NjcxMTIzNX0.gwyF47Lf5v6iO6_Rz4ta8EhOmLY47ht6ClRI7bb22zw"
            }
    } 
    #swagger.responses[401] = {
        description: 'Unauthorized user because of invalid credentials',
        schema: {
            message: 'Credenciales inválidas'
        }
    } 
    #swagger.responses[422] = {
        description: 'Unprocessable Entity',
        schema: {
            "body": {
                "email": "John Doe",
                "password": "prueba1234"
            },
            "message": "El email debe tener el formato de un correo electrónico y es requerido."
        }
    } 
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al realizar inicio de sesión. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 
    */

    try{
        const userPayload = req.body;
        const user = findUserByEmail(userPayload.email);
        if(!user || !(await bcrypt.compare(userPayload.password, user.password))) {
            res.status(401).json({message: 'Credenciales inválidas'});
            return;      
        }

        const token = jwt.sign({ id: user.id, isAuthenticated: true }, process.env.JWT_KEY, { expiresIn: '7d' });

        res.status(200).json({
            ...user,
            token,
        });
    }catch(error){
        res.status(500).json({ message: 'Ocurrió un error al realizar inicio de sesión. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}

exports.logoutUser = (req, res) => {
    // #swagger.tags = ['Users']
    /*  
    #swagger.parameters['id'] = { description: 'The id of the user that is logging out from the app' }
    #swagger.description = 'Logout the user from the application'
    */
    /* #swagger.responses[200] = {
        description: 'User successfully logged out of the app',
        schema: {
            message: 'Cierre de sesión exitoso para el usuario 1'
        }
    } 
    #swagger.responses[401] = {
        description: 'Unauthorized. User is not authenticated',
        schema: {
            error: true,
            message: 'El usuario no está autenticado',
        }
    } 
    */
    res.status(200).json({message: 'Cierre de sesión exitoso para el usuario ' + req.params.id});
}

exports.updateUser = (req, res) => {
    // #swagger.tags = ['Users']
    /*  
    #swagger.description = 'Update user personal information'
    #swagger.parameters['id'] = { description: 'The id of the user who is updating their data' }
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User personal informaction',
        schema: { $ref: '#/definitions/UpdateUser' }
    } 
    */
    /* #swagger.responses[200] = {
        description: 'User successfully edited',
        schema: {
            "body": {
                fullName: "John Doe",
                email: "john@correo.com",
                location: 1,
                phoneNumber: "86808521",
                photoUrl: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTzXP8yS66xjGHKpFXxFA5oSAh0AjA8xPRcU7I88COgApoIfvdk0kenagYFoJhN6u-I",
            }
        }
    } 
    #swagger.responses[401] = {
        description: 'Unauthorized. User is not authenticated',
        schema: {
            message: 'Credenciales inválidas',
        }
    } 
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al actualizar la información del usuario. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 
    */
    try {
        // This function is to simulate updating user data in json files
        const updateUserData = (user, userPayload) => true;
        const userPayload = req.body;
        const user = findUserById(req.params.id);
        if(!user) {
            res.status(401).json({
                message: 'Credenciales inválidas.',
            });
            return;   
        }
        if(updateUserData(user, userPayload)){
            res.status(200).json(userPayload);
        }
    } catch(error) {
        res.status(500).json({
            message: 'Ocurrió un error al actualizar la información del usuario. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error
        });
    }
}

exports.getItemsByUser = (req, res) => {
    // #swagger.tags = ['Users']
    /*  
    #swagger.description = 'Get user items '
    #swagger.parameters['id'] = { description: 'The id of the user who is requesting their items' }
    */
    /* #swagger.responses[200] = {
        description: 'Successfully user items response',
        schema: {
            "body": [
                {
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
                },
                {
                    "itemId": 9,
                    "ownerFullName": "David Xie Li",
                    "ownerUserId": 1,
                    "name": "Cámara web",
                    "location": 2,
                    "acquisitionDate": "2021-07-23",
                    "description": "Cámara web Full HD 1080P con cubierta de privacidad para videollamadas. Video realista de 1920 x 1080p, lente antirreflejo de 4 capas. Distancia focal fija de 1.97 a 197 pulgadas",
                    "wishlist": "Guantes de box",
                    "itemState": 2,
                    "category": 2,
                    "photoUrls": ["https://ci0137.s3.amazonaws.com/swap-it/uploads/9585387f-cbab-4477-b3ae-4949fe99a1db.jpg"]
                }
            ]
        }
    } 
    #swagger.responses[401] = {
        description: 'Unauthorized. User is not authenticated',
        schema: {
            message: 'Credenciales inválidas',
        }
    } 
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al cargar los artículos del usuario. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 
    */

    try {
        // SHOULD CHECK HERE? IF YES, THE RESPONSE CHANGES (401). MAYBE A MIDDLEWARE?
        // token = req.headers.authorization.split(' ')[1];
        // const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        // if(decodedToken.id != req.params.userId){
        //     res.status(401).send('No tiene los permisos para acceder a los artículos solicitados');
        //     return;
        // }
        const items = findItemsByUser(req.params.userId);
        if(!items){
            res.status(404).send('No se encuentra el usuario');
            return;
        }
        res.json(items);
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al cargar los artículos del usuario. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}