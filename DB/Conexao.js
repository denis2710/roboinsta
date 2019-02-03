const mysql = require('mysql')

class Conexao{

    constructor() {
        let dbParams = {
            host: 'localhost' ,
            port:  '3306',
            user: 'root' ,
            password: '',
            database: 'instaboot'
        }

        this.conexao = mysql.createConnection(dbParams);

        this.conexao.connect((err) => {
            if(err) throw err
            console.log('conectado ao bd com sucesso')
        })
    }


    query(query) {
        this.conexao.query(query, (err, result, campos) => {
            if (err) throw err
            console.log(result)
        })
    }
}

module.exports = new Conexao();