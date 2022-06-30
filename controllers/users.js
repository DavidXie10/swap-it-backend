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
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: {
            message: 'Ocurrió un error al realizar inicio de sesión. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: el servidor no responde'
        }
    } 
    #swagger.responses[422] = {
        description: 'Unprocessable Entity',
        schema: {
            "body": {
                "email": "John Doe",
                "password": "prueba1234"
            },
            "error": "El email debe tener el formato de un correo electrónico y es requerido."
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
    try {
        // This function is to simulate updating user data in json files
        const updateUserData = (user, userPayload) => true;
        const userPayload = req.body;
        const user = findUserById(req.params.id);
        if(!user) {
            res.status(401).send('Credenciales inválidas');
            return;   
        }
        if(updateUserData(user, userPayload)){
            res.status(200).json(userPayload);
        }
    } catch(error) {
        res.status(500).send('Error del servidor ' + error);
    }
}

exports.getItemsByUser = (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const items = findItemsByUser(req.params.userId);
        res.json(items);
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al cargar los artículos del usuario. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}