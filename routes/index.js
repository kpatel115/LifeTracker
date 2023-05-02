var express = require('express');
var router = express.Router();
var { ensureAuth, ensureGuest } = require('../middleware/auth')

const Card = require('../models/Card')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Life Tracker' });
});

// GET Login Page. (after logging in) Display User's Cards  
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login into Life Tracker'  });
});

// POST Register page. (after logging in) Display User's Cards  
router.post('/login', function(req, res, next) {
  res.render('login', { title: 'Login intto Life Tracker'  });
});

// GET Register page. (after logging in) Display User's Cards  
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'LifeTracker Dashboard'  });
});

// POST Register page. (after logging in) Display User's Cards  
router.post('/dashboard', async function(req, res, next) {
  res.render('dashboard', { title: 'LifeTracker Dashboard'  });
});



/*
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
*/

module.exports = router;
