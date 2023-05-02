var express = require('express');
var router = express.Router();
var passport = require('passport')


// Auth Google
// GET /auth/google

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google auth callback
// Get /auth/google/callback 
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}),
(req, res) => {
  res.redirect('/cards')
})

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    res.redirect('/')
  })
})

module.exports = router;