const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament.js');


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images/courts/');
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



/* GET tournaments index. */
router.get('/', function (req, res, next) {
    const tournamentsTable = Tournament.list();
    res.render('tournaments/index.hbs', { tournamentsTable });
});


/* GET details tournaments */
router.get('/details', function (req, res, next) {
    console.log("GET DETAILS TOURNAMENTS");
    // convert string req.query.id to int
    // another solution is to use == instead of === in if instruction
    const tournamentsIdParam = parseInt(req.query.id);
    const tournamentsFound = Tournament.findById(tournamentsIdParam);
    res.render('tournaments/details.hbs', { tournament: tournamentsFound  });

});



module.exports = router;