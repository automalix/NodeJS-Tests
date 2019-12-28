const path = require('path');

const express = require('express');

const router = express.Router();

const userArr = [];

router.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Assignment 4 Index',
        path: '/'
    });
});

router.post('/', (req, res) => {
    userArr.push({ username: req.body.username })
    res.redirect('/users');
})

exports.router = router;
exports.usernames = userArr;