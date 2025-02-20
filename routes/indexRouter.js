const { Router } = require('express');

const indexRouter = Router();
const { getIndexPage, getCreateForm } = require('../controllers/indexController');
const { body } = require('express-validator');


indexRouter.get('/', getIndexPage);
indexRouter.get('/create', getCreateForm);
indexRouter.post('/create', (req, res) => {
    if(req.body.itemType == 'book') {
        res.redirect('/create/add-book');
    } else if (req.body.itemType == 'videogame') {
        res.redirect('/create/add-videogame');
    }
});

indexRouter.get('/create/add-book', (req, res) => {
    res.end('Add book form');
})

indexRouter.get('/create/add-videogame', (req, res) => {
    res.end('Add videogame Form');
})


module.exports = indexRouter;