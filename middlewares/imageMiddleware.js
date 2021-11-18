const multer = require('multer'); //mult part form data 
const jimp = require('jimp'); // resize image
const uuid = require('uuid'); // generate unique id


const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter:(req, file, next) => { // check file type
      const allowed = ['image/jpeg', 'image/jpg', 'image/png']; //allowed file types
      if(allowed.includes(file.mimetype)){//if file type is allowed
        next(null, true);//next middleware
      }else{
        next({message: 'Tipo de arquivo não suportado'}, false);//if file type is not allowed
      }

    }
};

exports.upload = multer(multerOptions).single('photo'); //upload image

exports.resize = async (req, res, next) => {
    //check if there is no new file to resize
    if(!req.file){
        next();//next middleware
        return;
    }
    const extension = req.file.mimetype.split('/')[1]; //get file extension

    let fileName = `${uuid.v4()}.${extension}` //generate unique file name
    req.body.photo = fileName; //add file name to body

    //resize image

    const photo = await jimp.read(req.file.buffer); //read image
    await photo.resize(800, jimp.AUTO); //resize image
    await photo.write(`./public/media/${fileName}`); //write image
    next();//next middleware
   
}