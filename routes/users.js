const express = require('express');
const router = express.Router();
const db = require('../db/index');
const userController = require('../db/controller/users');

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

module.exports = router;