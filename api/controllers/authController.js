require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = function (req, res, next) {
    const authorization = req.headers['authorization'];

    if (authorization) {
        const token = authorization.split(' ')[1];
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            next();
        } catch (error) {
            res.status(process.env.UNAUTHORIZE_STATUS_CODE).json({ message: process.env.UNAUTHORIZE_MESSAGE });
        }
    } else {
        res.status(process.env.UNAUTHORIZE_STATUS_CODE).json({ message: process.env.UNAUTHORIZE_MESSAGE });
    }
}

const getToken = function () {
    return localStorage.getItem('token');
}

module.exports = { authenticate, getToken }