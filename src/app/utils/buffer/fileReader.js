const { log } = require('console');
const fs = require('fs');

fs.readFile('../testRead/010101.jpg', (err, buffer) => {
    console.log('arquivo lido');

    fs.writeFile('image2.jpg', buffer, (err) => {
        console.log('arquvio escrito');
    });
});