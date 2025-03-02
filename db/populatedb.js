require('dotenv').config();

const { Client } = require('pg');


const SQL = `
CREATE TABLE IF NOT EXISTS books (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255),
author VARCHAR(255),
publisher VARCHAR(255),
quantity INTEGER,
description VARCHAR(400),
cover_image_url VARCHAR(400)

);


INSERT INTO books (title, author, publisher, quantity, description, cover_image_url) 
VALUES ('Against the Day', 'Thomas Pynchon', 'The Penguin' ,32, 'The Chums of Chance, Trystero, quaternionist ! Nikola Tesla ???', 'https://m.media-amazon.com/images/I/71WXBhnEnRL.jpg'),
('Infinite Jest', 'David Foster Wallace', 'The Other Penguin', 12, 'The Year of Glad, in Enfield Tennis Academy', 'https://m.media-amazon.com/images/I/71J4YMYancL.jpg');

INSERT INTO books (title, author, publisher, quantity, description) 
VALUES ('A Good Man is Hard to Find', 'Flannery O''Connor ', 'The Funny Penguin' ,32, 'She was once like me... They were once at peace...');


INSERT INTO books (title, author, publisher, quantity, description) 
VALUES ('Freedom', 'Jonathan Franzen', 'Farrar, Straus and Giroux' , 42, 'The novel follows the lives of the Berglund family, particularly the parents Patty and Walter, as their lives develop and their happiness eventually falls apart. Important to their story is a college friend of Walter''s and successful rock musician, Richard Katz, who has an affair with Patty.');

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


