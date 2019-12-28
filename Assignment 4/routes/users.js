const path = require('path');

const express = require('express');

const router = express.Router();

const indexData = require('./index');

router.get('/users', (req, res) => {
    const usernames = indexData.usernames;
    res.render('users', {
        pageTitle: 'User List',
        path: '/users',
        userList: usernames
    });
});

exports.router = router;