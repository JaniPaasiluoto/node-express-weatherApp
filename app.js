const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

const weatherRoutes = require('./routes/weather');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(weatherRoutes);

app.listen(port, () => {
    console.log('Weather app started succesfully!')  
});

module.exports = app;