const express = require('express');
const router = express.Router();

/* Get courts page. */
router.get('/', (req, res) => {
    res.render('message.hbs');
});

module.exports = router;