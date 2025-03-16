require('dotenv').config();

const { Client } = require('pg');


const SQL = `
CREATE TABLE IF NOT EXISTS books (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255),
author VARCHAR(255),
publisher VARCHAR(255),
quantity INTEGER,
genre_id INTEGER,
description VARCHAR(400),
cover_image_url VARCHAR(400)

);


INSERT INTO books (title, author, publisher, quantity, genre_id, description, cover_image_url) 
VALUES ('Against the Day', 'Thomas Pynchon', 'The Penguin' ,32, 1, 'The Chums of Chance, Trystero, quaternionist ! Nikola Tesla ???', 'https://m.media-amazon.com/images/I/71WXBhnEnRL.jpg'),
('Infinite Jest', 'David Foster Wallace', 'The Other Penguin', 12, 2,'The Year of Glad, in Enfield Tennis Academy', 'https://m.media-amazon.com/images/I/71J4YMYancL.jpg');

INSERT INTO books (title, author, publisher, quantity, genre_id, description) 
VALUES ('A Good Man is Hard to Find', 'Flannery O''Connor ', 'The Funny Penguin' ,32, 3, 'She was once like me... They were once at peace...');


INSERT INTO books (title, author, publisher, quantity, genre_id, description, cover_image_url) 
VALUES ('Freedom', 'Jonathan Franzen', 'Farrar, Straus and Giroux' , 42, 4, 'The novel follows the lives of the Berglund family, particularly the parents Patty and Walter, as their lives develop and their happiness eventually falls apart. Important to their story is a college friend of Walter''s and successful rock musician, Richard Katz, who has an affair with Patty.', 'https://m.media-amazon.com/images/I/71bvzhU50jL.jpg');



CREATE TABLE IF NOT EXISTS genres 
(book_id INTEGER, genre_type VARCHAR(255),
CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE

);

INSERT INTO genres (book_id, genre_type) VALUES
(1, 'Novel'),
(1, 'Historical Fiction'),
(1, 'Psychological Fiction'),
(1, 'Experimental Literature');

SELECT books.title, genres.genre_type FROM books LEFT JOIN genres ON genres.book_id = books.genre_id;

INSERT INTO genres (book_id, genre_type) VALUES 
(2,'Novel'),
(2, 'Tragic Comedy'),
(2, 'Satire'),
(2, 'Post Modern Literature'),
(2, 'Humor'),
(2, 'Histerical Realism'),
(2, 'Science Fiction');

CREATE TABLE IF NOT EXISTS videogames
(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
game_title VARCHAR(255),
game_release_date TIMESTAMP,
game_quantity INTEGER,
game_description VARCHAR(1600),
game_cover_image_url VARCHAR(400)
);

CREATE TABLE IF NOT EXISTS game_genres 
(
game_id INTEGER REFERENCES videogames(id),
genre VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS developers
(
game_id INTEGER REFERENCES videogames(id),
developer_name VARCHAR(255)
);

INSERT INTO videogames (game_title, game_release_date, game_quantity, game_description, game_cover_image_url) VALUES 
(
'Elden Ring',
'Feb 25, 2022',
35,
'Elden Ring is an action RPG developed by FromSoftware and published by Bandai Namco Entertainment, released in February 2022. Directed by Hidetaka Miyazaki, with world-building contributions from novelist George R. R. Martin, the game features an expansive open world called the Lands Between. Players assume the role of a customisable character known as the Tarnished, who must explore this world, battle formidable enemies, and seek to restore the Elden Ring to become the Elden Lord. The game builds on the challenging gameplay mechanics familiar from the Dark Souls series but introduces a more open-ended structure with vast exploration, dynamic weather, and a day-night cycle. It offers deep lore, complex characters, and an interconnected world filled with secrets, dungeons, and powerful bosses.',
'https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4jni.jpg'
);

INSERT INTO developers (game_id, developer_name) VALUES
(1, 'Bandai Namco'),
(1, 'From Software');

INSERT INTO game_genres (game_id, genre) VALUES

(1, 'Adventure'),
(1, 'RPG');



`

async function main() {
    console.log('Seeding...');
    const client = new Client({
        connectionString: process.env.CONN_STRING
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();


