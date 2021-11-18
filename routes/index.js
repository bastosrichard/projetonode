const express = require('express');
const { index } = require('../controllers/homeController');
const { add, addAction, edit, editAction, view } = require('../controllers/postController');
const { login, loginAction, register, registerAction } = require('../controllers/userController');
const { upload, resize} = require('../middlewares/imageMiddleware')

//Rotas
const router = express.Router();

router.get('/', index);

router.get('/users/login',login);
router.post('/users/login',loginAction);

router.get('/users/register',register);
router.post('/users/register',registerAction);

router.get('/post/add', add); // é a tela de adicionar um post
router.post('/post/add',
upload,
resize,
addAction);//envia os dados

//editar post o :slug é para deixar dinamico
router.get('/post/:slug/edit', edit)
router.post('/post/:slug/edit', 
upload,
resize,
editAction)//editar post o :slug é para deixar dinamico

router.get('/post/:slug', view)


module.exports = router;


























// nome:req.query.nome,
// idade:req.query.idade,
// mostrar:false,
// ingredientes:[{nome:'Arroz', qt:'20g'},
//               {nome:'Feijão', qt:'10g'},],

// interesses:['Cinema', 'Esportes', 'Ler'],
// testeHTML:`<strong>Teste</strong>`



// router.get('/posts/:id',(req,res)=>{
//   //UTILIZAO DE PARAMS PARA RECEBER PARAMETROS
//   let id = req.params.id//pega o id da url
//   res.send(`Olá mundo ${id} lindao`) //envia o id para o usuario

// })

// router.get('/sobre',(req,res)=>{
//   res.send('Sobre')
// })
//POR ENVIO DE GET
  // let nome = req.query.nome
  // res.send(`Olá mundo ${nome} lindao`) 


  // //GET: req.query
  // //POST: req.body

  // //PARAMETROS URL: req.params

