const conexao = require('../DB/Conexao')
const Usuario = require('./../Model/Usuario')

const usuario = {

    listarTodos(){
        Usuario.findAll().then( usuarios => {
            console.log(usuarios)
        } )
    },

    async insertOrUpdate(dados) {
        return Usuario.findOrCreate({where: {id: dados.id}, defaults : dados})





        // Usuario.findOne({where: `id = '${dados.id}'`})
        //     .then((obj) => {
        //
        //         if(obj) { // update
        //             return obj.update(dados);
        //         }
        //         else { // insert
        //             return Model.create(dados);
        //         }
        //     })
    },

    async inserir(id, encontradoPor) {
        return Usuario.create({
            id: id,
            tag_encontrado: encontradoPor
        })
    }


}

module.exports = usuario