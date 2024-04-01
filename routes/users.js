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
    // Save the previous page in the session if it's not already stored
    if (!req.session.previousPage) {
        req.session.previousPage = req.get('Referer') || '/';
    }
    res.render('users/index.hbs', { errors: req.session.errors });
    req.session.errors = null;
});

/* POST user login page. */
router.post("/login", (req, res) => {
    const storedPassword = User.login(req.body.email);
    if (storedPassword && bcrypt.compareSync(req.body.password, storedPassword)) {
        req.session.connected = true;
        req.session.user = User.data(req.body.email);
        const previousPage = req.session.previousPage || "/";
        req.session.previousPage = null;
        res.redirect(previousPage);
    } else {
        if (!storedPassword) {
            req.session.errors = "Email incorrect";
        } else {
            req.session.errors = "Mot de passe incorrect";
        }
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
    // Save the current page URL in the session
    if (!req.session.previousPage) {
        req.session.previousPage = req.get('Referer') || '/';
    }

    // Store the previous page in a variable
    const previousPage = req.session.previousPage;

    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err); // Can be removed, ask teacher
        }
        // Redirect the user back to the previous page URL
        res.redirect(previousPage);
    });
});

module.exports = router;
