const express = require('express');
const path = require('path');
require('dotenv').config();

const db = require('./db/index');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const mockUser = require('./mock/user.json');

app.listen(PORT, () => console.log(`it's alive on ${BASE_URL}:${PORT}`));

// user routes
app.use('/user', require('./routes/users'));












/**
 * get user
 * 
 */
/*app.get('/user/:id', (request, response) => {
    const id = request.params.id;
    const sql = `SELECT * FROM user WHERE id = ${id}`;
    let user = null;
    try {
        if (db) {
            const query = db.query(sql, function (error, rows, fields) {
                if (error) {
                    throw error;
                }
                if (rows && rows[0] && rows.length === 1) {
                    user = rows[0];
                    response.status(200).send(user);
                } else {
                    response.status(500).send({ message: 'user not detectable' });
                }
            });
        } else {
            response.status(500).send({ message: 'database not available' });
        }
        //response.status(200).send(user[0]);
    } catch (error) {
        console.log(error);
        response.status(500).send();
    }
});

/**
 * set user
 * 
 */
/*
app.post('/user', (request, response) => {
    const { nickname, email, dojo, } = request.body;

    if (!nickname) {
        response.status(400).send({ message: 'nickname is mandatory' })
    }

    response.status(201).send({ message: 'user created' });

});
*/