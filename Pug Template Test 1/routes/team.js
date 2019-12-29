const express = require('express');

const router = express.Router();

const jumbotron = require('../util/jumbotron');
const teamCards = require('../util/team_members');

router.get('/team', (req, res, next) => {
    res.render('team', {
        pageTitle: 'Meet Our Team',
        path: 'team',
        jumbotron: jumbotron,
        card: teamCards
    });
});

exports.router = router;