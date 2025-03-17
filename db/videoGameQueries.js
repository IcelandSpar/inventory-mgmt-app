const pool = require('./pool');

async function getLimitedVideoGameList() {
    const { rows } = await pool.query(`SELECT videogames.id, game_title, game_release_date, game_quantity, game_description, game_cover_image_url,
 (SELECT json_agg(game_genres.genre) FROM game_genres WHERE game_id = videogames.id) AS genre_type, (SELECT json_agg(developers.developer_name) FROM developers WHERE developers.game_id = videogames.id) AS developers FROM videogames LEFT JOIN game_genres ON videogames.id = game_genres.game_id  RIGHT JOIN developers ON videogames.id = developers.game_id GROUP BY videogames.id ,game_title, game_quantity, game_description, game_cover_image_url, game_genres.genre ORDER BY videogames.id`);
console.log(rows)
    return rows;
}


module.exports = {
    getLimitedVideoGameList,
}