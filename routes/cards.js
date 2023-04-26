var express = require('express');
var router = express.Router();
const mongoRepo = require('../src/cardMongoDBRepo');

// GET User home page. (after logging in) Display User's Cards  
router.get('/', function(req, res, next) {
  res.render('cards', { title: 'Life Tracker' });
});

/* GET Create Health Card  */
router.get('/add', function(req, res, next) {
  res.render('cards_add', { title: 'Add A New Card' });
});

/* POST Create Health Card  */
router.post('/add', function(req, res, next) {
  // console.log(req.body);
  if(req.body.name.trim() === "") {
    res.render('cards_add', { title: "Add a Health Card", msg: "Please fill out the form"});
  } else {
    // add contact to database
    mongoRepo.create({ name: req.body.name, meals: req.body.meals, macros: req.body.macros, calories: req.body.calories, water: req.body.water, workout: req.body.workout, type: req.body.type, duration: req.body.duration, notes : req.body.notes, time: req.params.time})
    res.redirect('/cards');
    res.send('health card created');
  }
  
});

/* GET Single Health Card */ 
router.get('/:uuid', function(req, res, next) {
  const card = mongoRepo.findById(req.params.uuid);
  if (card) {
    res.render('card', { title: 'Your Health Card', card: card });
  } else {
    res.redirect('/cards');
  }
  
});

module.exports = router;


