const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

app.use(express.json());

// create connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});


// connect
db.connect((error) => {
    if (error) {
        throw error;
    }
    console.log('mysql connected...');
});

const mockUser = require('./mock/user.json');

app.listen(
    PORT,
    () => console.log(`it's alive on ${BASE_URL}:${PORT}`)
);

/**
 * get user
 * 
 */
app.get('/user/:id', (request, response) => {
    const id = request.params.id;
    const sql = `SELECT * FROM user WHERE id = ${id}`;
    let user = null;
    try {
        const query = db.query(sql, function (error, rows, fields) {
            if (error) {
                throw error;
            }
            console.log(rows[0]);
            //user = JSON.parse(JSON.stringify(result));
            //console.log(user);
        });
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
app.post('/user', (request, response) => {
    const { nickname, email, dojo, } = request.body;

    if (!nickname) {
        response.status(400).send({ message: 'nickname is mandatory' })
    }

    response.status(201).send({ message: 'user created' });

});