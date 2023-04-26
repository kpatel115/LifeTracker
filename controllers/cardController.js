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
    const newCard = new Card(req.params.uuid, req.body.name, req.body.lname, req.body.email, req.body.notes, req.params.time);
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
};
