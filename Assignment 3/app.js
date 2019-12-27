const path = require('path');

const express = require('express');

const app = express();

const indexPath = require('./routes/index');
const usersPath = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public'))); //static folders are available to the public. css/public js is stored here

app.use(usersPath);
app.use(indexPath);

app.listen(3000);