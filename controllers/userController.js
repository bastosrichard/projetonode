const User = require('../models/User')


exports.login = (req,res)=>{
  res.render('login')
}


exports.loginAction = (req,res)=>{
  const auth = User.authenticate();

  auth(req.body.email, req.body.password, (err,result)=>{ //result é o usuário
    if(!result){//se não existir
      req.flash('error', 'Usuario e/ou email incorretos ') //mensagem de erro
      return res.redirect('/users/login')//redireciona para a página de login
    }


    req.login(result, ()=>{}) 

    req.flash('success', 'Usuário logado com sucesso')//mensagem de sucesso
    res.redirect('/')
  })
}

exports.register = (req,res)=>{
  res.render('register')
}


//register action 
exports.registerAction = (req,res)=>{
  User.register(new User(req.body), req.body.password, (err,user)=>{
    if(err){
      req.flash('error', 'Ocorreum um erro, tente novamente mais tarde ')
  
      return res.redirect('/users/register')
    }
      req.flash('success', 'Usuário cadastrado com sucesso')
      res.redirect('/users/login')
    
  })
}