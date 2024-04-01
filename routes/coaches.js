const express = require('express');
const router = express.Router();

/* GET coaches page. */
router.get('/', (req, res) => {
    res.render('coaches/index.hbs', { session: req.session });
});

router.get('/bio', (req, res) => {
    res.render('coaches/details.hbs', { session: req.session });
});

router.get('/bio/send', (req, res) => {
    res.render('coaches/index.hbs', { session: req.session });
});

module.exports = router;
