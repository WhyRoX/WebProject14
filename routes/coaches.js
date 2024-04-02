const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach.js');

/* GET coaches page. */
router.get('/', (req, res) => {
  const errors = req.session.errors;
  req.session.errors = null;
    res.render('coaches/index.hbs', { session: req.session,  coaches: Coach.info(), errors: errors });
});

router.get('/details', (req, res) => {
    const userId = req.query.user_id;
    
    // Check if courtId is a number
    if (isNaN(userId)) {
      req.session.errors = 'Invalid user id';
      res.redirect('/coaches');
      return;
    }
  
    const coach = Coach.findById(userId);
  
    // Check if court exists
    if (!coach) {
      req.session.errors = 'Court not found';
      res.redirect('/coaches');
      return;
    }
  
    res.render('coaches/details.hbs', { coach });
  });


router.get('/bio', (req, res) => {
    res.render('coaches/details.hbs', { session: req.session });
});

router.get('/bio/send', (req, res) => {
    res.render('coaches/index.hbs', { session: req.session });
});


module.exports = router;
