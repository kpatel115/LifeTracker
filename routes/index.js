var express = require('express');
var router = express.Router();

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
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register for Life Tracker'  });
});

// POST Register page. (after logging in) Display User's Cards  
router.post('/register', async function(req, res, next) {
  //res.render('register', { title: 'Register for Life Tracker'  });
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      
    })
  } catch {

  }
});

module.exports = router;
