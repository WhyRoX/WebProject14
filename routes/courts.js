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
    res.render('courts/index.hbs', { courts: Court.info() });
});



router.get('/booking', (req, res) => {
    if (req.session.user !== undefined) {
      res.render('courts/index.hbs');
    } else {
      res.redirect('/');
    }
});

module.exports = router;
