const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { resolveApiKey } = require('./middleware/resolveApiKey');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

//app.use(cors());
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*")
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (request.method === "OPTIONS") {
        response.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return response.status(200).json({})
    }
    next()
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(resolveApiKey);

//const mockUser = require('./mock/user.json');

app.listen(PORT, () => console.log(`it's alive on ${BASE_URL}:${PORT}`));

// user routes
app.use('/user', require('./routes/users'));

// root routes
app.use('/', require('./routes/auth'));