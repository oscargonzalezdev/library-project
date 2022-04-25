const Book = require("../models/Book.model")
const { render, response } = require("../app");

const router = require("express").Router();

router.get("/books", (req, res, next) => {

    Book.find()
        .then( bookArr => {
            console.log(bookArr.length);
            res.render("books/books-list", {books: bookArr});
        }
        )
        .catch( err => {
            console.log("error getting books from DB", err);
            next(err);
        })
});


module.exports = router;