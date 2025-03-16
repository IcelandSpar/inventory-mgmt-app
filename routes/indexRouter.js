const { Router } = require('express');

const indexRouter = Router();
const { getIndexPage, getCreateForm, postBookOrVideoGame, getAddBookForm, postAddBook, getEditBookForm, postEditBookForm, getDeleteBookForm, postDeleteBook, getBooksPage } = require('../controllers/indexController');


indexRouter.get('/books', getBooksPage);

indexRouter.get('/', getIndexPage);
indexRouter.get('/create', getCreateForm);
indexRouter.post('/create', postBookOrVideoGame);

indexRouter.get('/create/add-book', getAddBookForm);
indexRouter.post('/create/add-book', postAddBook);

indexRouter.get('/editBook/:id', getEditBookForm);
indexRouter.post('/editBook/:id', postEditBookForm);

indexRouter.get('/deleteBook/:title/:id', getDeleteBookForm);
indexRouter.post('/deleteBook/:title/:id', postDeleteBook);

indexRouter.get('/create/add-videogame', (req, res) => {
    res.end('Add videogame Form');
});

module.exports = indexRouter;