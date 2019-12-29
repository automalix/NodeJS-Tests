const express = require('express');

const router = express.Router();

const jumbotron = require('../util/jumbotron');
const blogPosts = require('../util/blog_posts')

router.get('/blog', (req, res, next) => {
    res.render('blog', {
        pageTitle: 'Our Blog',
        path: 'blog',
        jumbotron: jumbotron,
        blog: blogPosts
    })
});

exports.router = router;