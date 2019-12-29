const express = require('express');

const router = express.Router();

const jumbotron = require('../util/jumbotron');
const careers = require('../util/career_descriptions');

router.get('/careers', (req, res, next) => {
    res.render('careers', {
        pageTitle: 'Work For Cohort 11 Dev',
        path: 'careers',
        jumbotron: jumbotron,
        job: careers
    })
});

exports.router = router;