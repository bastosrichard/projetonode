
const mongoose = require('mongoose')    //puxando o mongoose


require('dotenv').config({path: 'variables.env'}); //puxando o arquivo de configuração de variáveis


mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true
    })//conectando ao banco de dados
mongoose.Promise = global.Promise //usando o promise do node 

//MONITORANDO A CONEXÃO COM O BANCO DE DADOS CASO DE ERRO
mongoose.connection.on('error', error => { //se der erro na conexão
    console.error(`Erro: ${error}`)    //mostra o erro
    process.exit(1) //sai do processo 
})

//CARREGANDO OS MODELS
require('./models/Post')


const app = require('./app')//puxando o arquivo app.js
//SET PORT
app.set('port',process.env.PORT || 7772);//set the port number
const server = app.listen(app.get('port'),()=>{
    console.log(`Servidor rodando na porta:` + server.address().port);
})