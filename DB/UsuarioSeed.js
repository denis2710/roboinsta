const Usuario = require('./../Model/Usuario')

Usuario.sync({force:false})
        // .then(() =>{
        //     return Usuario.create({
        //         id: 'orochipedro',
        //         tag_encontrado: 'seed'
        //     })
        // })