var express = require('express');
var router = express.Router();
var { ensureAuth, ensureGuest } = require('../middleware/auth')

const Card = require('../models/Card')

// User Must login First - 
router.get('/', ensureGuest, (req, res) => {
  res.render('index', { title: 'Life Tracker' });
});

// Once logged in user will see cards page - User HomePage
router.get('/cards', ensureAuth, async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.id }).lean()
    res.render('cards', {
      name: req.user.name,
      cards,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})



module.exports = router;
