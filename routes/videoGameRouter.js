const { Router } = require('express');

const videoGameRouter = Router();

videoGameRouter.get('/', (req, res) => {
    res.render('videoGames');
});

module.exports = videoGameRouter;