const express = require('express');
const router = express.Router();

/* GET members page. */
router.get('/', (req, res) => {
    res.render('members/index.hbs');
});

module.exports = router;