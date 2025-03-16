const db = require("../db/videoGameQueries");

const getLimitedVideoGameListPage = async (req, res) => {
const data = await db.getLimitedVideoGameList();
res.render('videoGames', {videoGameData: data});
}

module.exports = {
    getLimitedVideoGameListPage,
}
