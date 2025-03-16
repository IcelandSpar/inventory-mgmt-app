const { Router } = require('express');
const { getLimitedVideoGameListPage } = require('../controllers/videoGameController');

const videoGameRouter = Router();

videoGameRouter.get('/', getLimitedVideoGameListPage);

module.exports = videoGameRouter;