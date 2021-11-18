exports.pageNotFound =(req, res,next) =>  {

  res.status(404).render('notFound')//altera status e renderiza pagina 404 do views


}