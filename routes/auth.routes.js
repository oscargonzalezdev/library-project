const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");

const router = require("express").Router();

const saltRounds = 10;

// route to display a form to create an acount
router.get("/register", (req, res, next) => {
    res.render("auths/register")
});

// route to send a post request
router.post("/register", (req, res, next) => {
    const { email, password } = req.body // ES6 object destruturing
    bcryptjs.genSalt(saltRounds)
        .then( salt => {
            return bcryptjs.hash(password, salt);
        })
        .then( hash => {
            const userDetails = {
                email,
                passwordHash: hash
            }
            return User.create(userDetails)
        })
        .then( userFromDB => {
            console.log("new user created: ", userFromDB);
            res.redirect("/")
        })

        .catch( err => {
            console.log("Error creating an acount", err);
        })
});

module.exports = router;