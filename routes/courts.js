const express = require('express');
const router = express.Router();

/* GET courts page. */
router.get('/', (req, res) => {
    res.render('court.hbs');
});

module.exports = router;
