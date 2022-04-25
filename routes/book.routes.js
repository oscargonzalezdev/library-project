const Book = require("../models/Book.model")
const { render, response } = require("../app");

const router = require("express").Router();

// create route for books list
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

// create route for book details
router.get("/books/:bookId", (req, res, next) => {

    const id = req.params.bookId;

    Book.findById(id)
        .then( bookDetails => {
            console.log(bookDetails);
            res.render("books/book-details", {book: bookDetails});
        }
        )
        .catch( err => {
            console.log("error getting book details from DB", err);
            next(err);
        })
});

module.exports = router;