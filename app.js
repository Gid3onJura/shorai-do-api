const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

app.use(express.json());

const mockUser = require('./mock/user.json');

app.listen(
    PORT,
    () => console.log(`it's alive on ${BASE_URL}:${PORT}`)
);

/**
 * get user
 * 
 */
app.get('/user', (request, response) => {
    response.status(200).send(mockUser);
});

/**
 * set user
 * 
 */
app.post('/user', (request, response) => {
    const { nickname, email, dojo, } = request.body;

    if (!nickname) {
        response.status(400).send({ message: 'nickname is mandatory' })
    }

    response.status(201).send({ message: 'user created' });

});