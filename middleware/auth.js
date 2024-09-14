const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user'); // Asegúrate de que la ruta sea correcta

dotenv.config();

const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
    console.log('Token:', token);
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);
        req.user = decoded.user;

        const users = await User.find();
        res.json(users);

        next(); // Llama a next() para pasar al siguiente middleware o ruta

    } catch (error) {
        console.error('error', error);
        res.status(401).json({ msg: 'Token no es válido' });
    }
};

module.exports = auth;