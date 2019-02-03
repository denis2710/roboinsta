const Sequelize = require('sequelize')
const sequelize = require('./../DB/Sequelize');

const Usuario = sequelize.define('usuarios', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    full_name: {
        type: Sequelize.STRING
    },
    bio:{
        type: Sequelize.TEXT
    },
    website:{
        type: Sequelize.STRING
    },
    is_busines:{
        type: Sequelize.BOOLEAN
    },
    media: {
        type: Sequelize.INTEGER
    },
    follows : {
        type: Sequelize.INTEGER
    },
    followed_by: {
        type: Sequelize.INTEGER
    },
    origin: {
        type: Sequelize.STRING
    },
    origin_from : {
        type: Sequelize.STRING
    }

})

module.exports = Usuario