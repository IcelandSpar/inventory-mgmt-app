require('dotenv').config();
const express = require('express');
const path = require('node:path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/indexRouter');
const videoGameRouter = require('./routes/videoGameRouter');

app.use('/', indexRouter);
app.use('/videoGames', videoGameRouter);


app.listen(process.env.SERVER_PORT, () => {
    console.log('Listening on port ' + process.env.SERVER_PORT);
})