var express = require('express');
var router = express.Router();

// GET User home page. (after logging in) Display User's Cards  
router.get('/', function(req, res, next) {
  res.render('cards', { title: 'Life Tracker' });
});

/* GET Create new card  */
router.get('/add', function(req, res, next) {
  res.render('cards_add', { title: 'Add A New Card' });
});

module.exports = router;
