const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const indexData = require('./routes/index');
const usersData = require('./routes/users');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(usersData.router);
app.use(indexData.router);

app.listen(3000);