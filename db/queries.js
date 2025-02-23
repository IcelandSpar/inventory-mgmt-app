const pool = require('./pool');

async function getAllBookInfo() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows; 
}

async function postBook(newBook) {
    await pool.query("INSERT INTO books (title, author, publisher, quantity, description, cover_image_url) VALUES ($1, $2, $3, $4, $5, $6)", newBook);
}

async function getBookDetails(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);
    return rows;
}

module.exports = {
    getAllBookInfo,
    postBook,
    getBookDetails,
}