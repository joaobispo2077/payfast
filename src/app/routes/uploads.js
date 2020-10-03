const fs = require('fs');

module.exports = (app) => {

    app.post('/upload/image', (req, res) => {

        const filename = req.headers.filename;
        console.log(filename);
        req.pipe(fs.createWriteStream(`./src/app/files/${filename}`))
            .on('finish', () => {
                res.status(201).json('ok');
            });


    });
}