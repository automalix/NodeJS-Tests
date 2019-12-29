const express = require('express');

const router = express.Router();

const jumbotron = require('../util/jumbotron');

router.get('/about', (req, res, next) => {
    res.render('about', { pageTitle: 'About Cohort 11', path: 'about', jumbotron: jumbotron })
});

exports.router = router;