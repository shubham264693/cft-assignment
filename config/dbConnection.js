const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    host : process.env.HOST,
    port : process.env.DBPORT,
    database : process.env.DB,
    username : process.env.USERNAME,
    password : process.env.PASSWORD,
    dialect : 'postgres'
})

module.exports = sequelize;