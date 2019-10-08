const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'users',
    {
        uuid: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        firstname: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        passwordHash: {
            type: Sequelize.STRING
        },
        birthDate: {
            type: Sequelize.STRING
        },
        userRol:{
            type:Sequelize.STRING
        },
        city:{
            type:Sequelize.STRING
        }
    }
)