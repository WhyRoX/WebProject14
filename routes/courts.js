const express = require('express');
const router = express.Router();
const Court = require('../models/Court.js');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
      const date = new Date();
    const uniquePrefix = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' + date.getDate() + '-' +
      date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
      cb(null, uniquePrefix + '-' + file.originalname);
  }
})

const upload = multer({ storage: storage });


/* GET courts page. */
router.get('/', (req, res) => {
  const errors = req.session.errors;
  req.session.errors = null;
  res.render('courts/index.hbs', { courts: Court.info(), errors: errors });
});

/* GET courts details page */
router.get('/details', (req, res) => {
  const courtId = req.query.court_id;
  
  // Check if courtId is a number
  if (isNaN(courtId)) {
    req.session.errors = 'Invalid court id';
    res.redirect('/courts');
    return;
  }

  const court = Court.findById(courtId);

  // Check if court exists
  if (!court) {
    req.session.errors = 'Court not found';
    res.redirect('/courts');
    return;
  }

  res.render('courts/details.hbs', { court });
});


/* GET courts booking page */
router.get('/booking', (req, res) => {
    if (req.session.user !== undefined) {
      res.render('courts/index.hbs');
    } else {
      res.redirect('/');
    }
});

module.exports = router;
