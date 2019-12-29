const express = require('express');

const router = express.Router();

const jumbotron = require('../util/jumbotron');
const cards = require('../util/portfolio_cards');

router.get('/portfolio', (req, res, next) => {
    res.render('portfolio', {
        pageTitle: 'Our Portfolio',
        path: 'portfolio',
        jumbotron: jumbotron,
        portfolio: cards
    })
});

exports.router = router;