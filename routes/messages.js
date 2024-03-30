const express = require('express');
const router = express.Router();

/* GET messages page. */
router.get('/', (req, res) => {
    res.render('messages/index.hbs');
});
router.get('/respond', (req, res) => {
    res.render('messages/index.hbs');
});

module.exports = router;
