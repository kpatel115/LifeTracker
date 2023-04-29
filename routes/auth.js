var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local');
var crypto = require('crypto');


router.get('/login', function(req, res, next) {
  res.render('login');
});



module.exports = router;