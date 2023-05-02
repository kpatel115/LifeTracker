var express = require('express');
var router = express.Router();
const cardController = require('../controllers/cardController');
const mongoRepo = require('../src/cardMongoDBRepo');


// GET User home page. (after logging in) Display User's Cards  
router.get('/', cardController.cards_list, function(req, res, next) {
  res.render('cards', { title: 'Life Tracker'  });
});



module.exports = router;


