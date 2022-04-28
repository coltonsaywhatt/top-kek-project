const express = require('express');
const router = express.Router();
const passport = require('passport');
const Clip = require('../models/clip');

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  Clip.find({}, (err, clips) => {
    clips.reverse();
    res.render('index', {clips, hostname: req.hostname});
  });
});
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
