const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

/* GET user page. */
router.get('/', (req, res) => {
    res.render('users/index.hbs'); // Render the user page (which will be used for both login and registration)
});

/* GET user login page. */
router.get('/login', (req, res) => {
    res.render('users/index.hbs'); // Render the login page using the same "index.hbs" file
});

/* GET user register page. */
router.get('/register', (req, res) => {
    res.render('users/register.hbs'); // Render the register page
});

module.exports = router;
