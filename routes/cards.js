var express = require('express');
var router = express.Router();
const cardController = require('../controllers/cardController');
const mongoRepo = require('../src/cardMongoDBRepo');
const { ensureAuth } = require('../middleware/auth')

const Card = require('../models/Card')

// GET User home page. (after logging in) Display User's Cards  
router.get('/', cardController.cards_list, function(req, res, next) {
  const data = mongoRepo.findAll()
  res.render('cards', { title: 'Life Tracker', cards: data  });
});

/* GET Create Health Card  */
router.get('/add', cardController.cards_create_get, function(req, res, next) {
  res.render('cards_add', { title: 'Add A New Card' });
});

/* POST Create Health Card  */
router.post('/add', cardController.cards_create_post, function(req, res, next) {
  /// console.log(req.body);
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
router.get('/:uuid', cardController.cards_detail, function(req, res, next) {
  const card = mongoRepo.findById(req.params.uuid);
  if (card) {
    res.render('card', { title: 'Your Health Card', card: card });
  } else {
    res.redirect('/cards');
  }
  
});
/* GET Delete Health Card */
router.get('/:uuid/delete', cardController.cards_delete_get, function(req, res, next) {
  const card = mongoRepo.findById(req.params.uuid);
  res.render('cards_delete', { title: 'Delete A Health Card', card: card });
});

/* POST Delete Healht Card */
router.post('/:uuid/delete', cardController.cards_delete_post, function(req, res, next) {
  //delete from repo
  mongoRepo.deleteById(req.params.uuid);
  res.redirect('/cards')
});

/* GET Edit Health Card */
router.get('/:uuid/edit', cardController.cards_edit_get, function(req, res, next) {
  const card = mongoRepo.findById(req.params.uuid);
  res.render('cards_edit', { title: 'Edit A Health Card', card: card });
});

/* POST Edit Health Card  */
router.post('/:uuid/edit', cardController.contacts_edit_post, function(req, res, next) {
  if (req.body.name.trim() === "") {
    const card = mongoRepo.findById(req.params.uuid);
    res.render('cards_edit', { title: "Edit a Health Card", msg: 'Please fill out the form'});
  } else {
    // update Database
    const updatedCard = {id: req.params.uuid, name: req.body.name.trim(), meals: req.body.meals.trim(), macros: req.body.macros.trim(), calories: req.body.calories.trim(), water: req.body.water.trim(), workout: req.body.workout.trim(), type: req.body.type.trim(), duration: req.body.duration.trim(), notes : req.body.notes.trim(), time: req.params.time.trim() };
    mongoRepo.update(updatedCard);
    res.redirect(`/cards/${req.params.uuid}`);
  }
  
});

module.exports = router;


