const express = require('express');
const router = express.Router();
const Court = require('../models/Court.js');

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

/*router.get('/update', (req, res) => {
  if (req.session.connected && req.session.user.status === 'coach') {
    Court.findById(req.query.court_id, function(err, courtInfo) {
      if (err) {
        console.error(err);
        res.redirect('/courts');
      } else {
        console.log(courtInfo);
        res.render('courts/update.hbs', { court : courtInfo });
      }
    });
  } else {
    req.session.errors = 'Access denied: only coaches can update courts';
    res.redirect('/courts');
  }
});

router.post("/update", upload.single('court_image'), async (req, res) => {
  let picture = null;
  console.log('court_id:', req.body.court_id);

  if (!req.file) {
    if (req.body.court_id) {
      const court = await Court.findById(req.body.court_id);
      picture = court ? court.court_image : null;
    }
  } else {
    picture = "/images/courts/" + req.file.filename;
  }

  if (picture) {
    Court.update(req.body.court_id, req.body.name, req.body.flooring_type, req.body.location, picture, (err) => {
      if (err) {
        console.error(err);
        res.redirect('/courts');
      } else {
        res.redirect('/courts/details?court_id=' + req.body.court_id);
      }
    });
  } else {
    console.error('No court_id provided or no court found with the provided court_id');
    res.redirect('/courts');
  }
});*/
/*
// GET route for the update page
router.get('/update', (req, res) => {
  if (req.session.connected && req.session.user.status === 'coach') {
    Court.findById(req.query.court_id, function(err, courtInfo) {
      if (err) {
        console.error(err);
        res.redirect('/courts');
      } else if (!courtInfo) {
        req.session.errors = 'The requested court does not exist';
        res.redirect('/courts');
      } else {
        res.render('courts/update.hbs', { court : courtInfo });
      }
    });
  } else {
    req.session.errors = 'Access denied: only coaches can update courts';
    res.redirect('/courts');
  }
});

// POST route for the update form submission
router.post('/update', upload.single(req.query.court_image), (req, res, next) => {
  if (req.session.connected && req.session.user.status === 'coach') {
    Court.findById(req.body.court_id, function(err, courtInfo) {
      if (err) {
        console.error(err);
        res.redirect('/courts');
      } else if (!courtInfo) {
        req.session.errors = 'The requested court does not exist';
        res.redirect('/courts');
      } else {
        // Update the court information
        courtInfo.name = req.body.name;
        courtInfo.flooring = req.body.flooring;
        courtInfo.location = req.body.location;
        courtInfo.court_image = req.file ? "/images/courts/" + req.file.filename : courtInfo.court_image;

        // Save the updated court information
        courtInfo.save(function(err) {
          if (err) {
            console.error(err);
            res.redirect('/courts');
          } else {
            res.redirect('/courts/' + courtInfo._id);
          }
        });
      }
    });
  } else {
    req.session.errors = 'Access denied: only coaches can update courts';
    res.redirect('/courts');
  }
});
*/
/* GET courts booking page */
router.get('/booking', (req, res) => {
    if (req.session.user !== undefined) {
      res.render('courts/index.hbs');
    } else {
      res.redirect('/');
    }
});

module.exports = router;
