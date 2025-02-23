const pool = require('./pool');

async function getAllBookInfo() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows; 
}

async function postBook(newBook) {
    await pool.query("INSERT INTO books (title, author, publisher, quantity, description, cover_image_url) VALUES ($1, $2, $3, $4, $5, $6)", newBook);
}

module.exports = {
    getAllBookInfo,
    postBook,
}