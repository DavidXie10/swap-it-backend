const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByEmail, findUserById, findItemsByUser } = require('../utils/constants');

exports.loginUser = async (req, res) => {
    try{
        const userPayload = req.body;
        const user = findUserByEmail(userPayload.email);

        if(!user || !(await bcrypt.compare(userPayload.password, user.password))) {
            res.status(401).send('Credenciales inválidas');
            return;      
        }

        const token = jwt.sign({ id: user.id, isAuthenticated: true }, process.env.JWT_KEY, { expiresIn: '1d' });

        delete user.password;

        res.json({
            ...user,
            token,
        });
    }catch(error){
        res.status(500).send('Error del servidor ' + error);
    }
}

exports.logoutUser = (req, res) => {
    res.status(200).send('Cierre de sesión exitoso');
}

exports.updateUser = (req, res) => {
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
    try {
        const items = findItemsByUser(req.params.userId);
        res.json(items);
    } catch (error) {
        res.status(500).json({message: 'Ocurrió un error al cargar los artículos del usuario. Intente nuevamente. Si el error persiste, contacte al administrador del sistema. Error: ' + error});
    }
}

