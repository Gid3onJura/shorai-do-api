const express = require('express');
const md5 = require('md5');
const router = express.Router();
const db = require('../db/index');
const userController = require('../db/controller/users');
const schemas = require('../validation/schemas');
const validation = require('../validation/validation');

router.get('/', async (request, response) => {
    const findUser = await userController.findAllUser();
    //console.log('findUser!!!!', findUser);
    if (findUser) {
        return response.send({
            count: findUser.length
        }).status(200);
    } else {
        return response.sendStatus(500);
    }
});

router.post('/', validation(schemas.createUser, 'body'), async (request, response) => {

    const requestBody = request.body;

    const userData = {
        nickname: requestBody.nickname,
        password: md5(requestBody.password),
    }

    const nicknameExists = await userController.nicknameExists(userData.nickname);
    if (nicknameExists) {
        return response.status(400).send({
            message: 'user already exists'
        });
    }

    const userAdded = await userController.createUser(userData);
    if (userAdded) {
        return response.status(201).send();
    } else {
        return response.status(500).send({
            message: 'user not created'
        });
    }
})

module.exports = router;