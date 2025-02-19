const { Router } = require('express');

const indexRouter = Router();
const { getIndexPage, getSearchPage } = require('../controllers/indexController');



indexRouter.get('/', getIndexPage);



module.exports = indexRouter;