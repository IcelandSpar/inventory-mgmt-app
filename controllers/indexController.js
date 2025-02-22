const db = require('../db/queries');


const getIndexPage =  async (req, res) => {
    const data = await db.getAllBookInfo();
    res.render('index', {data: data});
};

const getCreateForm = async (req, res) => {
    res.render('createItemForm', {title: 'Add Items'});
};

const postBookOrVideoGame = async (req, res) => {
    if(req.body.itemType == 'book') {
        res.redirect('/create/add-book');
    } else if (req.body.itemType == 'videogame') {
        res.redirect('/create/add-videogame');
    }
};

const getAddBookForm = (req, res) => {
    res.render('add-book-form');
}

module.exports = {
    getIndexPage,
    getCreateForm,
    postBookOrVideoGame,
    getAddBookForm
}