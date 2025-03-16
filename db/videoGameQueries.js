const pool = require('./pool');

async function getLimitedVideoGameList() {
    const { rows } = await pool.query('SELECT * FROM videogames');
    return rows;
}


module.exports = {
    getLimitedVideoGameList,
}