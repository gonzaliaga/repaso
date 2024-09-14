const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const User = require('./models/user');

dotenv.config();

//ruta protegida
router.get('users', auth, async (req, res) => {
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

        next();
    } catch (error) {
        console.error('error', error);
        res.status(401).json({ msg: 'Token no es válido' });
    }


});
module.exports = router;