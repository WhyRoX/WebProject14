const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');


/* GET user page. */
router.get('/', (req, res) => {
    res.render('users/index.hbs'); // Render the user page (which will be used for both login and registration)
});

/* GET user login page. */
router.get('/login', (req, res) => {
    res.render('users/index.hbs', { errors: req.session.errors });
    req.session.errors = null;// Render the login page using the same "index.hbs" file
});

/* POST user login page. */
router.post("/login/connect", (req, res) => {
    if (bcrypt.compareSync(req.body.password, User.login(req.body.email))) {
        req.session.connected = true;
        req.session.user = User.data(req.body.email);
        res.redirect("/");
    } else {
        req.session.errors = "Mot de passe incorrect";
        res.redirect("/users/login");
    }
});

/* GET user register page. */
router.get('/register', (req, res) => {
    res.render('users/register.hbs'); // Render the register page
});

/* POST user register page. */
router.post('/add', (req, res) => {
    const User = require('../models/User.js');
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);
    const status = 'regular';
    User.save(firstname, surname, email, password, status);
    req.session.connected = true;
    res.redirect('/'); // Redirect to the login page
});

/* GET user logout page. */
router.get('/logout', (req, res) => {
    req.session.destroy(); // Destroy the session
    res.redirect('/'); // Redirect to the home page
});

module.exports = router;
