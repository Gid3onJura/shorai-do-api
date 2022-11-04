const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return response.status(401).send();
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return response.status(403).send();
        }
        request.user = user;

        next();
    });
}