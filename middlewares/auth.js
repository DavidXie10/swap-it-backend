const jwt = require('jsonwebtoken');
const { findUser } = require('../utils/constants');

exports.checkUserIsAuthenticated = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        if(!token) {
            res.status(401).json({
                error: true,
                message: 'El usuario no está autenticado',
            });
        }else{
            try {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                const user = findUser(decodedToken.username);
                if(!user){
                    res.status(401).json({
                        error: true,
                        message: 'El usuario no está autenticado',
                    });
                }

                next();
            } catch (error) {
                res.status(400).json({
                    error: true,
                    message: 'La información enviada no es válida. Verifique que su sesión no haya expirado.',
                });
            }
        }
    }else{
        res.status(401).json({
            error: true,
            message: 'El usuario no está autenticado',
        });
    }
};