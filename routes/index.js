var express = require('express');
var router = express.Router();
var { ensureAuth, ensureGuest } = require('../middleware/auth')

const Card = require('../models/Card')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Life Tracker' });
});





module.exports = router;
