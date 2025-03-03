const pool = require('./pool');

async function getLimitedBookInfo() {
    // let { rows } = await pool.query('SELECT * FROM books ORDER BY id LIMIT 3');
    // let queryRes = await pool.query('SELECT book_id, genres.genre_type FROM genres JOIN books ON books.genre_id = genres.book_id');
    // console.log(queryRes.rows)
    const { rows } = await pool.query(`SELECT books.id, title, author, publisher, quantity, description, cover_image_url,
json_agg(genre_type) AS genre_type FROM books LEFT JOIN genres ON book_id = genre_id GROUP BY books.id, title, author, publisher, quantity, description, cover_image_url ORDER BY books.id`);



        
//    console.log(genreIdBatch.rows)
    // rows.forEach(element => {
    //     element.genre_type = [];
    // })

    // queryRes.rows.forEach(item => {
        
    //     rows.forEach((element, index )=> {
    //         if(item.book_id == element.genre_id) {
    //             element.genre_type.push(item.genre_type)
                
    //         }
    //     })
    // })

    // console.log(rows)


    return rows;
}

async function getAllBookInfo() {
    const { rows } = await pool.query('SELECT * FROM books ORDER BY id');
    return rows; 
}

async function postBook(newBook) {
    const {rows} = await pool.query("INSERT INTO books (title, author, publisher, quantity, description, cover_image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", newBook);
    // const id = await pool.query('SELECT id FROM books WHERE title=$1 AND author=$2 AND publisher=$3 AND quantity=$4 AND description=$5 AND cover_image_url=$6', newBook)
    // return id.rows[0];
    return rows[0].id

}

async function postGenre(book_id, genre) {
    await pool.query('INSERT INTO genres (book_id, genre_type) VALUES ($1, $2)', [book_id, genre]);
    await pool.query('UPDATE books SET genre_id = $1 WHERE id=$1', [book_id])
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
    postGenre,
}