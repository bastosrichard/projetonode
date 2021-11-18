const express = require("express");
const mongoose = require("mongoose");
const mustache = require("mustache-express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

//bang da senha e autenticação
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



const router = require("./routes/index");
const helpers = require("./helpers/helpers");
const { pageNotFound } = require("./handlers/errorHandler");

//Configuracoes

const app = express();


app.use(express.json()); //permite que o express entenda o formato json
app.use(express.urlencoded({ extended: true })); //permite que o express entenda o formato urlencoded

app.use(express.static(`${__dirname}/public`)); 

app.use(cookieParser(process.env.SECRET_KEY)); //usa o secret key para criptografar o cookie
app.use(
  session({ 
    secret: process.env.SECRET_KEY,
    resave: false, //diz para a sessao que nao precisa ser destruida e recriada caso não tenha alteração
    saveUninitialized: false, //diz para a sessao que nao precisa ser destruida e recriada caso não tenha alteração
  })
);

app.use(flash()); 




//define o helpers antes de iniciar as rotas
app.use((req, res, next) => {
  res.locals.h = helpers;
  //passa as mensagens para o frontend para serem exibidas na tela
  res.locals.flashes = req.flash(); 
  res.locals.user = req.user; 
  //passa o usuario para o frontend para serem exibidas na tela
  next();
});



app.use(passport.initialize());
app.use(passport.session());


const User = require("./models/User"); //importa o modelo de usuario
passport.use(new LocalStrategy(User.authenticate()));//passa o local de autenticação
passport.serializeUser(User.serializeUser()); //serializa o usuario para salvar no cookie
passport.deserializeUser(User.deserializeUser()); //deserializa o usuario do cookie





//ROTAS

app.use("/", router); //usa e importa as rotas

app.use(pageNotFound); //rota de erro 404

app.engine("mst", mustache(__dirname + "/views/partials", ".mst"));
app.set("view engine", "mst");
app.set("views", __dirname + "/views");

module.exports = app;
