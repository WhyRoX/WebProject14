const express = require('express');
const router = express.Router();

/* GET tournaments page. */
router.get('/', (req, res) => {
    res.render('tournaments/index.hbs');
});

module.exports = router;