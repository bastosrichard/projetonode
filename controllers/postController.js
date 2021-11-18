const mongoose = require('mongoose');

const Post = mongoose.model('Post');

//renderiza tela de adicionar post
exports.add = (req, res) => {
  res.render('postAdd');//renderiza tela de adicionar post
};
//salva post
exports.addAction = async (req, res) => {
  //separa as tags por virgula e remove os espaços
  req.body.tags = req.body.tags.split(',').map(t => t.trim());

  const post = new Post(req.body);//cria um novo post  

  try{
    await post.save();//salva no banco de dados

  }catch(error){
    console.log(error);
    req.flash('error', `Erro: ${error.message}`); //mensagem de erro
    return res.redirect('/post/add'); //para o processo e redireciona para a pagina post

  }
   
  req.flash('success', 'Post adicionado com sucesso!');//mensagem de sucesso


  res.redirect('/');//redireciona para a pagina inicial
};

 



//edita post
exports.edit = async (req, res) => {
  //Pegar as informações do post
  const post = await Post.findOne({slug:req.params.slug});



  //Carregar o form de edição
  res.render('postEdit', {post});
}

exports.editAction = async (req, res) => {

  req.body.tags = req.body.tags.split(',').map(t => t.trim());
  //atualiza o slug
  req.body.slug = require('slug')(req.body.title, {lower: true});

  try{

  //Procura o item enviado
  const post = await Post.findOneAndUpdate(
    {slug: req.params.slug}, 
     req.body ,
    {
      new:true,//retorna o item(post) atualizado
      runValidators: true //pega  no Schema para evitar erros, forçando as validacoes
    }
    )

  }catch(error){
    console.log(error);
    req.flash('error', `Erro: ${error.message}`); //mensagem de erro
  return res.redirect(`/post/${req.params.slug}/edit`); //para o processo e redireciona para a pagina post

  }

  //Pegar os dados e atualizar no banco de dados

  req.flash('success', 'Post atualizado com sucesso!');//mensagem de sucesso

  //Mostrar mensagem de sucesso e redirecionar para a pagina inicial
  res.redirect('/');
}




exports.view = async (req, res) => {

    //Pegar as informações do post
    const post = await Post.findOne({slug:req.params.slug});



    //Carregar o form de edição
    res.render('view', {post});
  

}
 