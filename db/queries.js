const pool = require('./pool');

async function getAllBookInfo() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows; 
}

module.exports = {
    getAllBookInfo,
}