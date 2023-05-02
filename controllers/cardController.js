var express = require('express');
var router = express.Router();
const cardRepo = require('../src/cardMongoDBRepo');
const { validationResult } = require('express-validator');
const Card = require('../src/Card');

/* GET Contacts listing. */
exports.cards_list = async function(req, res, next) {
  const data = await cardRepo.findAll();
  res.render('cards', { title: 'LifeTracker', cards: data });
};

/* GET create health card */
exports.cards_create_get = function(req, res, next) {
  res.render('cards_add', { title: 'Add a Health Card' });
};

/* POST create card. */
exports.cards_create_post = async function(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.render('cards_add', { title: 'Add a Health Card', msg: result.array() });
  } else {
    const newCard = new Card(req.params.uuid, req.body.name, req.body.meals, req.body.macros, req.body.calories, req.body.water, req.body.workout, req.body.type, req.body.duration, req.body.notes,  req.params.time);
    await cardRepo.create(newCard);
    res.redirect('/cards');
  }
};

/* GET single Health Card. */
exports.cards_detail = async function(req, res, next) {
  const card = await cardRepo.findById(req.params.uuid);
  if (card) {
    res.render('card', { title: 'Your Health Card', card: card });
  } else {
    res.redirect('/cards');
  }
  
/* GET delete Contact */
exports.cards_delete_get = async function(req, res, next) {
  const card = await cardRepo.findById(req.params.uuid);
  res.render('cards_delete', { title: 'Delete Health Card', card: card });
};

/* POST delete contact. */
exports.cards_delete_post = async function(req, res, next) {
  await cardRepo.deleteById(req.params.uuid);
  res.redirect('/cards');
};

/* GET edit contact */
exports.card_edit_get = async function(req, res, next) {
  const card = await cardRepo.findById(req.params.uuid);
  res.render('cards_edit', { title: 'Edit Health Card', card: card });
};

/* POST edit contact. */
exports.cards_edit_post = async function(req, res, next) {
  //console.log(req.body);
  if (req.body.name.trim() === '') {
    const card = await cardRepo.findById(req.params.uuid);
    res.render('cards_edit', 
      { title: 'Edit Health Card', msg: 'Contact field can not be empty!', card: card }
    );
  } else {
    const updatedCard = new Card(req.params.uuid, req.body.name, req.body.meals, req.body.macros, req.body.calories, req.body.water, req.body.workout, req.body.type, req.body.duration, req.body.notes,  req.params.time);
    await cardRepo.update(updatedCard);
    res.redirect(`/cards/${req.params.uuid}`);
  }
}
  
};
