const express = require('express');
const router = express.Router();

/* GET courts page. */
router.get('/', (req, res) => {
    res.render('courts/index.hbs');
});

router.get('/booking', (req, res) => {
    if (req.session.user !== undefined) {
      res.render('courts/index.hbs');
    } else {
      res.redirect('/');
    }
  });

module.exports = router;
