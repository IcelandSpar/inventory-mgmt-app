const pool = require('./pool');

async function getLimitedBookInfo() {
    const { rows } = await pool.query('SELECT * FROM books ORDER BY id LIMIT 3');
    return rows;
}

async function getAllBookInfo() {
    const { rows } = await pool.query('SELECT * FROM books ORDER BY id');
    return rows; 
}

async function postBook(newBook) {
    await pool.query("INSERT INTO books (title, author, publisher, quantity, description, cover_image_url) VALUES ($1, $2, $3, $4, $5, $6)", newBook);
}

async function getBookDetails(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);
    return rows;
}

async function updateBookDetails(id, bookDetailsArr) {
    await pool.query("UPDATE books SET title=$2, author=$3, publisher=$4, quantity=$5, description=$6, cover_image_url=$7 WHERE id=$1", [id, ...bookDetailsArr]);
}

async function getDeleteBookImage(id) {
    const { rows } = await pool.query("SELECT cover_image_url FROM books WHERE id=$1", [id]);
    return rows;
}

async function deleteBook(id) {
    await pool.query("DELETE FROM books WHERE id=$1",[id]);
}

module.exports = {
    getAllBookInfo,
    postBook,
    getBookDetails,
    updateBookDetails,
    getDeleteBookImage,
    deleteBook,
    getLimitedBookInfo,
}