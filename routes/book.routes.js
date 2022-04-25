const Book = require("../models/Book.model")
const { render, response } = require("../app");

const router = require("express").Router();

// create route for books list
router.get("/books", (req, res, next) => {

    Book.find()
        .then( bookArr => {
            // console.log(bookArr.length);
            res.render("books/books-list", {books: bookArr});
        }
        )
        .catch( err => {
            console.log("error getting books from DB", err);
            next(err);
        })
});

// create route for render the form 
router.get("/books/create", (req, res, next) => {
    res.render("books/book-create");
});

// POST route to save a new book to the database in the books collection
router.post('/books/create', (req, res, next) => {
    // console.log(req.body);
    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating,
    }
    Book.create(newBook)
    .then( response => {
        console.log("New book stored successfuly", response);
        res.redirect("/books");
    })
    .catch( err => {
        console.log("error creating a new document in DB", err);
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