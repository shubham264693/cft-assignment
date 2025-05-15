const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    host : 'localhost',
    database : 'CFT_DB',
    username : 'postgres',
    password : 'root',
    dialect : 'postgres',
    port : 5432,
})

module.exports = sequelize;