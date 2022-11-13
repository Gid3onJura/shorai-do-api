const express = require('express');
const path = require('path');
require('dotenv').config();
const { resolveApiKey } = require('./middleware/resolveApiKey');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(resolveApiKey);

//const mockUser = require('./mock/user.json');

app.listen(PORT, () => console.log(`it's alive on ${BASE_URL}:${PORT}`));

// user routes
app.use('/user', require('./routes/users'));

// root routes
app.use('/', require('./routes/auth'));