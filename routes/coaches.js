const express = require('express');
const router = express.Router();

/* GET coaches page. */
router.get('/', (req, res) => {
    res.render('coaches/index.hbs');
});

router.get('/bio', (req, res) => {
    res.render('coaches/details.hbs');
});

router.get('/bio/send', (req, res) => {
    res.render('coaches/index.hbs');
});





module.exports = router;