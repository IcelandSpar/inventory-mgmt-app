require('dotenv').config();

const { Client } = require('pg');


const SQL = `
CREATE TABLE IF NOT EXISTS books (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255),
author VARCHAR(255),
publisher VARCHAR(255),
quantity INTEGER,
description VARCHAR(400)

);


INSERT INTO books (title, author, publisher, quantity, description) 
VALUES ('Against the Day', 'Thomas Pynchon', 'The Penguin' ,32, 'The Chums of Chance, Trystero, quaternionist ! Nikola Tesla ???'),
('Infinite Jest', 'David Foster Wallace', 'The Other Penguin', 12, 'The Year of Glad, in Enfield Tennis Academy');

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


