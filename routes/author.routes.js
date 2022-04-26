const Book = require("../models/Book.model")
const Author = require("../models/Author.model")
const { render, response } = require("../app");

const router = require("express").Router();

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

module.exports = router;