const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const validateUser = [
    body('title').trim()
    .isAlpha().withMessage('Title name must be an alphanumeric value.'),
    body('author').trim()
    .isAlpha().withMessage('Author name must be an alphanumeric value.'),
    body('publisher').trim()
    .isAlpha().withMessage('Publisher name must be an alphanumeric value.'),
    body('quantity').trim()
    .isNumeric().withMessage('Quantity must be a number.')
    .isFloat({min: 0}).withMessage('Quantity must be a positive number.')
    .custom(value => value % 1 == 0 ? true : false).withMessage('Quantity must be a whole number, not a decimal.'),
    body('imageUrl').trim()
    .isURL().withMessage('Image submission must be an ImageURL')
];

const getIndexPage =  async (req, res) => {
    const data = await db.getAllBookInfo();
    res.render('index', {data: data});
};

const getCreateForm = async (req, res) => {
    res.render('createItemForm', {title: 'Add Items'});
};

const postBookOrVideoGame = async (req, res) => {
    if(req.body.itemType == 'book') {
        res.redirect('/create/add-book');
    } else if (req.body.itemType == 'videogame') {
        res.redirect('/create/add-videogame');
    }
};

const postAddBook = [
    validateUser,
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        
        return res.status(400).render('add-book-form', {errors: errors.array(), data: req.body});
    }

    const { title, author, publisher, quantity, description, imageUrl } = req.body;
    const newBookArr = [title, author, publisher, quantity, description, imageUrl];
    await db.postBook(newBookArr);
    
    res.redirect('/');
}]

const getAddBookForm = (req, res) => {
    res.render('add-book-form');
}

const getEditBookForm = async (req, res) => {

    const data = await db.getBookDetails(req.params.id);
    res.render('editBookForm', {data: data})
}

const postEditBookForm = async (req, res) => {
    await db.updateBookDetails(req.params.id, [req.body.title, req.body.author, req.body.publisher, req.body.quantity, req.body.description, req.body.imageUrl]);
    res.redirect('/');
}

module.exports = {
    getIndexPage,
    getCreateForm,
    postBookOrVideoGame,
    getAddBookForm,
    postAddBook,
    getEditBookForm,
    postEditBookForm,
}