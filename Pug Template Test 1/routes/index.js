const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Cohort 11 Dev',
        path: 'index'
    })
});

exports.router = router;