require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model(process.env.USER_MODEL_NAME);

const jwt = require('jsonwebtoken');
const { response } = require('express');

const _sendResponse = function (res, response) {
    res.status(response.status).json(response);
    return;
}

const _createResponseObject = function (status) {
    return {
        status: Number(status),
        message: ""
    }
}

const _setSuccessResponse = function (response) {
    response.status = Number(process.env.SUCCESS_CODE);
    response.message = process.env.ADD_SUCCESS_MESSAGE;
}

const _setResponseInternalError = function (response, error) {
    response.status = Number(process.env.INTERNAL_SERVER_ERROR_CODE);
    response.message = error;
}

// const old_login = function (req, res) {
//     let username = req.body.username;
//     let response = _createResponseObject(process.env.DEFAULT_STATUS_CODE);
//     User.findOne({ 'username': username })
//         .then((databaseUser) => {
//             if (!databaseUser) {
//                 response.status = Number(process.env.UNAUTHORIZE_STATUS_CODE);
//                 response.message = process.env.UNAUTHORIZE_MESSAGE;
//                 _sendResponse(res, response);
//             } else {
//                 const passwordMatch = bcrypt.compare(req.body.password, databaseUser.password)
//                     .then((passwordMatch) => {
//                         if (!passwordMatch) {
//                             response.status = Number(process.env.UNAUTHORIZE_STATUS_CODE);
//                             response.message = process.env.PASSWORD_INVALID_MESSAGE;
//                         } else {
//                             response.status = Number(process.env.SUCCESS_CODE);
//                             const token = jwt.sign({
//                                 name: databaseUser.name,
//                                 username: databaseUser.username
//                             }, process.env.SECRET_KEY, { expiresIn: '24h' });
//                             response.token = token;
//                             response.message = process.env.LOGIN_SUCCESS_MESSAGE;
//                         }
//                         _sendResponse(res, response);
//                     })
//                     .catch((error) => {
//                         _setResponseInternalError(error);
//                         _sendResponse(res, response);
//                     });
//             }
//         })
//         .catch((error) => {
//             console.log("Failed")
//             _setResponseInternalError(response, error);
//             _sendResponse(res, response);
//         });
// }

const _createToken = function (response) {
    console.log("Creating token ");
    return new Promise((resolve) => {
        const token = jwt.sign({
            name: response.name,
        }, process.env.SECRET_KEY, { expiresIn: '24h' });
        response.token = token;
        response.message = process.env.LOGIN_SUCCESS_MESSAGE;
        resolve();
    })
}

const _ifPasswordMatchThenGenerateToken = function (passwordMatch, response) {
    return new Promise((resolve, reject) => {
        if (!passwordMatch) {
            response.status = Number(process.env.UNAUTHORIZE_STATUS_CODE);
            response.message = process.env.PASSWORD_INVALID_MESSAGE;

            reject("Password invalid");
        } else {
            response.status = Number(process.env.SUCCESS_CODE);
            resolve();
        }
    })
}

const _doesUserExist = function (databaseUser, response) {
    return new Promise((resolve) => {
        response.name = databaseUser.name;
        resolve(databaseUser);
    });
}

const login = function (req, res) {
    let username = req.body.username;
    let response = _createResponseObject(process.env.DEFAULT_STATUS_CODE);
    User.findOne({ 'username': username })
        .then((databaseUser) => _doesUserExist(databaseUser, response))
        .then((databaseUser) => bcrypt.compare(req.body.password, databaseUser.password))
        .then((passwordMatch) => _ifPasswordMatchThenGenerateToken(passwordMatch, response))
        .then(() => _createToken(response))
        .catch(() => _setResponseInternalError(response, process.env.UNAUTHORIZE_MESSAGE))
        .finally(() => _sendResponse(res, response));
}

const _generateHashPassword = function (req, salt) {
    return bcrypt.hash(req.body.password, salt);
}

const _createNewUser = function (req, hashPassword) {
    return new Promise((resolve) => {
        if (hashPassword) {
            const newUser = {
                name: req.body.name,
                username: req.body.username,
                password: hashPassword
            }
            resolve(newUser);
            return;
        }
    })
}

const _addNewUser = function (newUser) {
    return User.create(newUser);
}

const register = function (req, res) {
    console.log("Registering user...");
    const response = _createResponseObject(process.env.DEFAULT_STATUS_CODE);
    bcrypt.genSalt(Number(process.env.PASSWORD_SALT_ROUND))
        .then((salt) => _generateHashPassword(req, salt))
        .then((hashedPassword) => _createNewUser(req, hashedPassword))
        .then((user) => _addNewUser(user))
        .then((createdUser) => _setSuccessResponse(response))
        .catch((error) => _setResponseInternalError(response, process.env.USER_ALREADY_EXISTS_MESSAGE))
        .finally(() => _sendResponse(res, response));
}

const success = function (req, res) {
    console.log("Success==", req.user);
    if (req.user) {
        const token = jwt.sign({
            name: req.user._json.name,
            username: req.user.username
        }, process.env.SECRET_KEY, { expiresIn: '24h' });

        res.redirect(`http://localhost:4200/home?token=${token}`);
    }
}

module.exports = { register, login, success }