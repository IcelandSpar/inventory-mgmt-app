const { Router } = require('express');

const indexRouter = Router();
const { getIndexPage, getCreateForm, postBookOrVideoGame, getAddBookForm, postAddBook, getEditBookForm, postEditBookForm } = require('../controllers/indexController');


indexRouter.get('/', getIndexPage);
indexRouter.get('/create', getCreateForm);
indexRouter.post('/create', postBookOrVideoGame);

indexRouter.get('/create/add-book', getAddBookForm);
indexRouter.post('/create/add-book', postAddBook);

indexRouter.get('/editBook/:title/:id', getEditBookForm);
indexRouter.post('/editBook/:title/:id', postEditBookForm);

indexRouter.get('/create/add-videogame', (req, res) => {
    res.end('Add videogame Form');
})


module.exports = indexRouter;