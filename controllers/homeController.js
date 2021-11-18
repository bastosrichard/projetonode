const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index = async (req,res)=>{
  let responseJson = {
   pageTitle:'Pagina inicial',
   posts:[],
   tags:[],
   tag:'',
  
  }

  console.log(req.user);


  //busca todas as tags
  responseJson.tag = req.query.t;

  //se existir tag, filtra por ela, senao, busca todos
  const postFilter = (typeof responseJson.tag != 'undefined') ? {tags:responseJson.tag} : {}; 



  //busca todas as tags
  const tagsPromise =  Post.getTagsList();
  //busca todos os posts
  let postsPromise =  Post.find(postFilter)  //filtra


  //grupo as promessas em um array para aguardar todas e depois executar o callback
  const [tags, posts] = await Promise.all([tagsPromise,postsPromise]); //aguarda todas as promessas 



  //adiciona a classe selected para a tag selecionada
  for(let i in tags){
    if(tags[i]._id == responseJson.tag){
      tags[i].class = 'selected'
    
    }
  }

    responseJson.tags = tags;
    responseJson.posts = posts;

  res.render('home', responseJson);
}