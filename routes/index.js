const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdf = require('html-pdf');

const converter = require('../models/htmlPdfConverter');

//Set storage&filename here
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/')
  },
  filename: function (req, file, cb) {
    cb(null, `d-${Date.now()}-${file.originalname}`)
  }
})

const fileUpload = multer({ storage: storage });

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Html to pdf'});
});

router.post('/upload', fileUpload.single('sampleHtml'), (req, res) => {
  if (!req.file)
    return res.status(400).send('No files were uploaded.');

    //Checking what the textarea is returning...//remove when it works.
    console.log(req.body.options);
    console.log(req.body);

    //Setup variables for the converter.
    let tmpFile = req.file;
    let pdfName = //The regex is supposed to remove the original file extension.
    `${__dirname}/../tmp/${tmpFile.originalname.replace(/\.[^/.]+$/, "")}.pdf`;
    let settings = null || null//insert form settings here
    //Invoke the converter from ../models/htmlPdfConverter
    converter(settings,tmpFile.path,(err,data,options)=>{
        pdf.create(data, options).toStream((err, stream)=>{
            if (err) throw err;
            stream.pipe(fs.createWriteStream(pdfName));
            console.log('success');
            res.download(pdfName)//It's not working as intended.."Pdf file could not be opened"//It should be called from a cb function.or emitter
    });
  });
});

module.exports = router;