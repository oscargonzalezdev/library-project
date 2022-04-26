const Book = require("../models/Book.model")
const { render, response } = require("../app");

const router = require("express").Router();

// route to display all books
router.get("/books", (req, res, next) => {

    Book.find()
        .then(bookArr => {
            // console.log(bookArr.length);
            res.render("books/books-list", { books: bookArr });
        }
        )
        .catch(err => {
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
        .then(response => {
            console.log("New book stored successfuly", response);
            res.redirect("/books");
        })
        .catch(err => {
            console.log("error creating a new document in DB", err);
            next(err);
        })
});

// create route for book details
router.get("/books/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
        .then(bookDetails => {
            console.log(bookDetails);
            res.render("books/book-details", { book: bookDetails });
        }
        )
        .catch(err => {
            console.log("error getting book details from DB", err);
            next(err);
        })
});

// display form to update books
router.get("/books/:bookId/edit", (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
        .then(bookDetails => {
            res.render("books/book-edit", bookDetails)
        })
        .catch(err => {
            console.log("error reading a book", err);
            next(err);
        })
})

// request to update books
router.post("/books/:bookId/edit", (req, res, next) => {
    const id = req.params.bookId;
    const newDetails = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating,
    };

    Book.findByIdAndUpdate(id, newDetails)
        .then(response => {
            console.log(response);
            res.redirect(`/books/${response._id}`)
        })
        .catch(err => {
            console.log("error updating book", err);
            next(err);
        })
})

// request to delete books

router.post("/books/:bookId/delete", (req, res, next) => {
    const id = req.params.bookId;
    Book.findByIdAndRemove(id)
        .then(response => {
            console.log(response);
            res.redirect("/books")
        })
        .catch(err => {
            console.log("error deleting book", err);
            next(err);
        })
})

module.exports = router;