const fs = require('fs');

fs.createReadStream('image.jpg')
    .pipe(fs.createWriteStream('image-with-stream.jpg'))
    .on('finish', () => {
        console.log('arquivo escrito com stream');
    });