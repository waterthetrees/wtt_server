import morgan from('morgan');
import express from ('express');
import multer from ('multer');
import path from ('path');
import knex from ('knex');

const db = knex(
{
  client: 'pg',
  connection: {
    host: '',
    user: 'trees',
    password: 'trees3r4t',
    database: 'treedb',
  },
}
);
const imageUpload = multer({
dest: 'images',
});


const imageuploadRouter = express.Router();


imageuploadRouter.use(express.json());
imageuploadRouter.use(morgan('dev'));


imageuploadRouter.post('/image', imageUpload.single('image'), (req, res) => {
const { filename, mimetype, size } = req.file;
const filepath = req.file.path;
db
 .insert({
  filename,
  filepath,
  mimetype,
  size,
 })
 .into('DATABASE TABLE NAME')
 .then(() => res.json({ success: true, filename }))
 .catch(err => res.json({ success: false, message: 'upload failed', stack: err.stack }));
});


imageuploadRouter.get('/image/:filename', (req, res) => {
const loaded = false;
const { filename } = req.params;
if(loaded === false){
    console.log('image loading');
}
db.select('*')
   .from('DATABASE TABLE NAME')
   .where({ filename })
   .then(images => {
     if (images[0]) {
   const dirname = path.resolve();
       const fullfilepath = path.join(dirname, images[0].filepath);
       return res.type(images[0].mimetype).sendFile(fullfilepath);
       loaded = true;
     }
     return Promise.reject(new Error('Image does not exist'));
   })
   .catch(err => res.status(404).json({success: false, message: 'not found', stack: err.stack}),
   );
});