const mongoose = require("mongoose");
const slug = require("slug");
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  photo:String,
  title: {
    type: String,
    required: "O post precisa de um titulo",
    minlength: 3,
    trim: true,
  },
  slug: String,
  body: {
    type: String,
    trim: true,
    required: "O post não pode estar vazio",
  },
  tags: [String],
});


// Antes de salvar o post, gera um slug para o titulo
postSchema.pre("save", async function (next) { // next é o callback
  if (this.isModified("title")) { // se o titulo foi modificado
    this.slug = slug(this.title, {lower:true}); // gera um slug tudo minusculo

    //SLUG UNICO OM REGEX - regular expression
    // garante que o slug seja unico para cada post no banco de dados 
    // se o slug for igual a outro post, gera um novo slug 

    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i"); 
    // ^ = começa com
    // ${this.slug} = pega o slug do post
    // (-[0-9]*)$ = pega o ultimo numero do slug
    // i = case insensitive

    // busca todos os posts com o slug
    const postsWithSlug = await this.constructor.find({slug: slugRegEx}); 

    if (postsWithSlug.length > 0) {
      // se o slug ja existir, adiciona um numero no final do slug 
      this.slug = `${this.slug}-${postsWithSlug.length + 1}`; 
    }

    
  }
  next(); // chama o next
});


postSchema.statics.getTagsList = function () {
  return this.aggregate([

    // desagrega o array de tags em cada um deles || o $ é o nome do campo
    {$unwind: "$tags"}, 

    // agrupa as tags e conta quantos posts tem cada tag
    { $group: { _id: "$tags", count: { $sum: 1 } } }, 

    // ordena os resultados por ordem alfabetica
    { $sort: { count: -1 } } // 1 = crescente, -1 = decrescente
  ])
}


module.exports = mongoose.model("Post", postSchema);
