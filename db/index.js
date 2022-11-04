require('dotenv').config();

const Sequelize = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;

const db = new Sequelize(DB_NAME, DB_USER, DB_PW, {
    host: DB_HOST,
    dialect: 'mysql',
    operatorsAliases: '0',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: process.env.CODE_ENVIRONMENT === 'LOCAL' ? console.log : false
});

// test connection
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((error) => console.log(error));

module.exports = db;