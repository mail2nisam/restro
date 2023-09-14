const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
app.use(cors());
const {generate} = require('./generate');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/') // Files will be stored in the 'uploads/' directory
      },
    // filename: function (req, file, cb) {
    //     switch (file.mimetype) {
    //         case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    //             ext = '.xlsx';
    //             break;
    //     }
    //     cb(null, 'sample' + ext);
    // }
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Generate unique filenames
      }
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
  });
//var upload = multer({storage: storage});
const upload = multer({ dest: 'data/' })
app.post('/api/upload',upload.single('xlsxFile'),(req,res)=>{
    console.log(req.file);
    generate();
    res.send('success');
});

app.get("/", (req, res)  =>{
  console.log('reached here');
  // generate();
  // res.send('success');
});

app.listen('3001',()=>{
    console.log('listening 3001');
})