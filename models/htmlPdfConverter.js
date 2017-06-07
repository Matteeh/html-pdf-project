const fs = require('fs');

const htmlPdfConverter = (options,filePath,converterFnc) => {
    //Set the settings for the pdf file.
    options = options ||  { //default setup
        format: 'Letter',
        header: {
                    height: '100mm',
                    contents: '<div style="text-align: center;">Author: Mathias</div>'
                },
        base: 'file:///sandbox/htmlPdfConverter/tmp/',
    };
    //Read the html file
    fs.readFile(filePath, 'utf8', (err, data) =>{
        if (err) throw err;
        converterFnc(null, data, options);
    });
}
module.exports = htmlPdfConverter;
