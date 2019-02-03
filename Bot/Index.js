const puppetter = require('puppeteer');

class Bot {

  constructor(){
      this.config = require('../Bot/BootConfig.json')
      this.Usuario = require('../Controller/Usuario')
  }

  async iniciarBot() {
    await this.iniciarPuppetter();
    await this.visitarInstagram();
    await this.logar();
    // await this.seguirUsuarios();
    // await this.sair();
  }

  async obterUsuariosFromHastags(){
    let hastags = ['corridaderua', 'devrunners', 'circuitodasestacoes']
    await this.loopTags(0, hastags)
    console.log('looptags retornou')

  }

  async loopTags(i, hastags) {
    if( i <= (hastags.length - 1)){
      let tag = hastags[i]
      await this.explorarHastag(tag, 3, true)
          .then(async () =>{ await this.loopTags((i + 1), hastags) })
    } else {
        return true
    }

  }

  async iniciarPuppetter() {
    this.browser = await puppetter.launch({
      headless: !this.config.configuracoes.abrirTela,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    this.page = await this.browser.newPage();
    console.log('puppeteer inicializado')
  }

  async visitarInstagram() {
    await this.page.goto(this.config.url, {timeout: 60000});
    await this.page.waitForSelector(this.config.seletores.to_conect_se, {timeout: 60000});
    await this.page.click(this.config.seletores.to_conect_se);
    await this.page.waitFor(500);
    return console.log('visitou Instagram')
  }

  async logar() {

    // preenche o usuario e senha
    await this.page.click(this.config.seletores.usuario_input);
    await this.page.keyboard.type(this.config.usuario);
    await this.page.click(this.config.seletores.senha_input);
    await this.page.keyboard.type(this.config.senha);
    await this.page.click(this.config.seletores.btn_login);
    await this.page.waitFor(2500);
    return console.log('realizou Login');
  }

  async sair() {
    await this.browser.close();
    return console.log('Fechou Pagina');
  }

  async irParaHashtag(tag) {
    await this.page.goto(`${this.config.url}/explore/tags/${tag}/`)
    await this.page.waitFor(2500);
  }

  async seguirUsuarios() {

  }

  async explorarHastag(tag, limite, interagirPopulares) {
    limite = limite || 10;
    interagirPopulares = interagirPopulares || false;
    console.log(`<<<< Explorando >>>> #${tag}`);
    await this.irParaHashtag(tag);

    let refNavegacao = `article > div > div >  .Nnq7C:nth-child(1) > .v1Nh3:nth-child(1)`;
    if(interagirPopulares){
      refNavegacao = `article > div > div > div >  .Nnq7C:nth-child(1) > .v1Nh3:nth-child(1)`;
    }

    await this.page.click(refNavegacao)

    let postId = '';
    let x = '';
    for (let i = 0; i < limite; i++) {
      postId = await this.getPostId();
      console.log(`Explorando o post ${postId}`)
      let likers = await this.getLikers();

      if(likers){
        await this.asyncInserirUsuarios(0, likers, tag)

      }

      await this.page.click(this.config.seletores.proxima_foto);
      await this.page.waitFor(500 + Math.floor(Math.random() * 250));//wait for random amount of time

    }

    await this.page.click(this.config.seletores.fechar_foto);

  }

  async asyncInserirUsuarios(i, likers, tag){

    if( i <= (likers.length - 1)){
      let liker = {
        id: likers[i],
        origin: 'busca-tag',
        origin_from: tag
      }


      this.Usuario.insertOrUpdate(liker)
          .then(async () =>{ await this.asyncInserirUsuarios((i + 1), likers) })

    } else {
      return true
    }


  }

  async loopTags(i, hastags) {
    if( i <= (hastags.length - 1)){
      let tag = hastags[i]
      await this.explorarHastag(tag, 3, true)
          .then(async () =>{ await this.loopTags((i + 1), hastags) })
    } else {
      return true
    }

  }

  async getPostId(){
    // let id = await this.page.$('.c-Yi7').href.replace('https://www.instagram.com/p/', '')
    let id = await this.page.url()
    id = id.replace('https://www.instagram.com/p/', '').replace('/', '');
    return id;
  }

  async getLikers() {
    await this.page.waitFor(500 + Math.floor(Math.random() * 250));//wait for random amount of time
    var video = null != (await this.page.$(this.config.seletores.link_likers_video));
    var foto = null != (await this.page.$(this.config.seletores.link_likers_foto));

    if (foto) {
      await this.page.waitFor(500 + Math.floor(Math.random() * 250));//wait for random amount of time

      await this.page.click(this.config.seletores.link_likers_foto);
      await this.page.waitForSelector(this.config.seletores.lista_likers_usuario, {timeout: 1500})
          .catch((e) => console.log(`erro: ${erro}` ))
      // await this.page.waitFor(1000 + Math.floor(Math.random() * 250));//wait for random amount of time

      let usuarios = await this.page.evaluate((params) => {

        let classUser = params.seletor;

        return Array.from(document.querySelectorAll(classUser)).map(e => e.innerText)

      },{seletor: this.config.seletores.lista_likers_usuario})

      return usuarios;

    }


  }
}
module.exports = Bot;