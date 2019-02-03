const Bot = require('./Bot/')

require('./DB/UsuarioSeed')
const bot = new Bot();
bot.iniciarBot()
    .then(() => {
        console.log('boot iniciado...')
        bot.obterUsuariosFromHastags();
        // bot.InteragirComUsuarios();
    })

const usuario = require("./Controller/Usuario")

// usuario.listarTodos()

console.log('robo rodando')