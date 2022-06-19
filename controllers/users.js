const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUser } = require('../utils/constants');

exports.loginUser = async (req, res) => {
    try{
        const userPayload = req.body;
        const user = findUser(userPayload.email);

        if(!user || !(await bcrypt.compare(userPayload.password, user.password))) {
            res.status(401).send('Credenciales inválidas');
            return;      
        }

        const token = jwt.sign({ id: user.id, isAuthenticated: true }, process.env.JWT_KEY, { expiresIn: '7d' });

        delete user.password;

        res.json({
            ...user,
            token,
        });
    }catch(error){
        res.status(500).send('Error del servidor ' + error);
    }
}