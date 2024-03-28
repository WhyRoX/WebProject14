const express = require('express');
const router = express.Router();

/* GET tournaments page. */
router.get('/', (req, res) => {
    res.render('users/index.hbs');
});

module.exports = router;