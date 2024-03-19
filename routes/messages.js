const express = require('express');
const router = express.Router();

/* GET messages page. */
router.get('/', (req, res) => {
    res.render('message.hbs');
});

module.exports = router;
