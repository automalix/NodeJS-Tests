//core node modules
const path = require('path');

//third party modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const aboutData = require('./routes/about');
const blogData = require('./routes/blog');
const careersData = require('./routes/careers');
const contactData = require('./routes/contact');
const indexData = require('./routes/index');
const portfolioData = require('./routes/portfolio');
const teamData = require('./routes/team');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(aboutData.router);
app.use(blogData.router);
app.use(careersData.router);
app.use(contactData.router);
app.use(indexData.router);
app.use(portfolioData.router);
app.use(teamData.router);

app.listen(3000);