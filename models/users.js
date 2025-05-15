const { Sequelize,DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/dbConnection')

const User = db.define('User',{
    first_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    last_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    mobile : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    isActive : {
        type : DataTypes.BOOLEAN,
        defaultValue : true
    }
})

User.beforeCreate(async (user)=>{
    user.password = await bcrypt.hash(user.password,10);
})


module.exports = User;