const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const jumbotron = require('../util/jumbotron');

router.get('/contact', (req, res, next) => {
    res.render('contact', {
        pageTitle: 'Contact Us',
        path: 'contact',
        jumbotron: jumbotron,
        //sendEmail: sendEmail()
    });
});

// sending an email from contact page POSTs here
router.post('/success', (req,res,next) => {
    console.log(
        'First Name: '+req.body.first+'\n',
        'Last Name: '+req.body.last+'\n',
        'Email: '+req.body.email+'\n',
        'Comments: '+req.body.comments
        );
    res.redirect('/contact');
})

exports.router = router;