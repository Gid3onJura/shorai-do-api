const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

const userController = require('../db/controller/users');
const schemas = require('../validation/schemas');
const validation = require('../validation/validation');

let refreshTokens = [];

router.post('/login', validation(schemas.loginUser, 'body'), async (request, response) => {
    try {
        const { nickname, password } = request.body
        // authenticate user
        const userAllowed = await authenticateUser(nickname, password);

        if (userAllowed) {
            const accessToken = generateAccessToken({ id: userAllowed.id, nickname: userAllowed.nickname });
            const refreshToken = generateRefreshToken(userAllowed);
            saveRefreshToken(refreshToken);
            response.send({ accessToken, refreshToken });
        }

        return response.status(403).send();
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({
            message: 'login not available'
        });
    }
});

router.post('/refreshtoken', validation(schemas.refreshToken, 'body'), async (request, response) => {
    const refreshToken = request.body.token;
    if (!refreshToken) {
        return response.status(401).send();
    }

    if (!refreshTokenExists(refreshToken)) {
        return response.status(403).send();
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            return response.status(403).send();
        }
        const accessToken = generateAccessToken({ id: user.id, nickname: user.nickname });
        response.send({ accessToken });
    });
});

router.delete('/logout', validation(schemas.refreshToken, 'body'), async (request, response) => {
    const refreshToken = request.body.token;
    console.log(refreshToken);
    deleteRefreshToken(refreshToken);
    response.status(204).send();
});

const authenticateUser = async (nickname, password) => {
    return await userController.userExists(nickname, password);
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

const saveRefreshToken = (token) => {
    refreshTokens.push(token);
    return;
}

const refreshTokenExists = (token) => {
    console.log("token: ", token);
    console.log("token im Array: ", refreshTokens.includes(token));
    return refreshTokens.includes(token);
}

const deleteRefreshToken = (refreshToken) => {
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    console.log(refreshTokens);
    return;
}

module.exports = router;