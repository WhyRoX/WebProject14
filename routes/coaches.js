const express = require('express');
const router = express.Router();

/* GET coaches page. */
router.get('/', (req, res) => {
    res.render('coaches/coach.hbs');
});

module.exports = router;
