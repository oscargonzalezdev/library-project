const Book = require("../models/Book.model")
const Author = require("../models/Author.model")
const { render, response } = require("../app");

const router = require("express").Router();
const isLoggedIn = require("../middleware/route-guard")

// route to display list of authors
router.get("/", (req, res, next) => {
    Author.find()
    .then(authorsArr => {
        res.render("authors/authors-list", {authors: authorsArr})
    })
    .catch(err => {
        console.log("error geting authors list", err);
        next(err)
    })
})

// create route for render the form 
router.get("/create", isLoggedIn, (req, res, next) => {
    Author.find()
        .then(authorsArr => {
            res.render("authors/authors-create", {authors: authorsArr});
        })
});

// POST route to create a new author
router.post('/create', isLoggedIn, (req, res, next) => {
    // console.log(req.body);
    const newAuthor = {
        name: req.body.name,
        favouriteFood: req.body.favouriteFood,
        country: req.body.country
    }
    Author.create(newAuthor)
        .then(response => {
            console.log("New author stored successfuly", response);
            res.redirect("/authors");
        })
        .catch(err => {
            console.log("error creating a new author in DB", err);
            next(err);
        })
});


module.exports = router;