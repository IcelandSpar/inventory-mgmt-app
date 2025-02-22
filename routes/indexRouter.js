const { Router } = require('express');

const indexRouter = Router();
const { getIndexPage, getCreateForm, postBookOrVideoGame, getAddBookForm } = require('../controllers/indexController');
const { body } = require('express-validator');


indexRouter.get('/', getIndexPage);
indexRouter.get('/create', getCreateForm);
indexRouter.post('/create', postBookOrVideoGame);

indexRouter.get('/create/add-book', getAddBookForm)

indexRouter.get('/create/add-videogame', (req, res) => {
    res.end('Add videogame Form');
})


module.exports = indexRouter;