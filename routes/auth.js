var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local');
var crypto = require('crypto');

// Auth Google
// GET /auth/google

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google auth callback
// Get /auth/google/callback 
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}),
(req, res) => {
  res.redirect('/dashboard')
})


module.exports = router;