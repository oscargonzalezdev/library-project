const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");

const router = require("express").Router();

const saltRounds = 10;

// REGISTER: route to display a form to create an acount
router.get("/register", (req, res, next) => {
    res.render("auths/register")
});

// REGISTER: route to send a post request
router.post("/register", (req, res, next) => {
    const { email, password } = req.body // ES6 object destruturing
    // make sure users fill all mandatory fields:
    if (!email || !password) {
        res.render('auths/register', { errorMessage: 'All fields are mandatory. Please provide your email and password.' });
        return;
    }

    bcryptjs.genSalt(saltRounds)
        .then(salt => {
            return bcryptjs.hash(password, salt);
        })
        .then(hash => {
            const userDetails = {
                email,
                passwordHash: hash
            }
            return User.create(userDetails)
        })
        .then(userFromDB => {
            console.log("new user created: ", userFromDB);
            res.redirect("/")
        })

        .catch(err => {
            console.log("Error creating an acount", err);
        })
});

// LOGIN: display form
router.get("/login", (req, res, next) => {
    res.render("auths/login")
})

// LOGIN: process form
router.post("/login", (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.render('auths/login', {
            errorMessage: 'Please enter both, email and password to login.'
        });
        return;
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                //user doesn't exist
                res.render('auths/login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcryptjs.compareSync(password, user.passwordHash)) {
                // login successful
                res.render('auths/user-profile', {user});
            } else {
                // login failed
                res.render('auths/login', { errorMessage: 'Incorrect password.' });
            }
        })
        .catch(error => next(error));
});

//PROFILE PAGE
router.get('/user-profile', (req, res, next) => {
    res.render('auths/user-profile');
});

module.exports = router;