require('dotenv').config();
const express = require('express');
const path = require('node:path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRouter = require('./routes/indexRouter');

app.use('/', indexRouter)


app.listen(process.env.SERVER_PORT, () => {
    console.log('Listening on port ' + process.env.SERVER_PORT)
})