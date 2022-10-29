const express = require('express');
const router = express.Router();
const db = require('../db/index');
const userController = require('../db/controller/users');
const { response } = require('express');

router.get('/', async (request, response) => {
    const findUser = await userController.findAllUser();
    //console.log('findUser!!!!', findUser);
    if (findUser) {
        response.send({
            count: findUser.length
        }).status(200);
    } else {
        response.sendStatus(500);
    }
});

router.post('/', async (request, response) => {
    const data = {
        nickname: 'Blob',
        email: 'send@web.de',
        password: '12345'
    };
    const addUser = await userController.createUser(data);
})

module.exports = router;