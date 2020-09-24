const app = require('./src/config/customExpress')();

app.listen(3000, (req, res) => {
    console.log('server is running at port 3000');
});