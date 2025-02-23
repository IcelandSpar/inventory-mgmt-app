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

const postAddBook = async (req, res) => {
    const { title, author, publisher, quantity, description, imageUrl } = req.body;
    const newBookArr = [title, author, publisher, quantity, description, imageUrl];
    await db.postBook(newBookArr);
    
    res.redirect('/');
};

const getAddBookForm = (req, res) => {
    res.render('add-book-form');
}

const getEditBookForm = async (req, res) => {

    const data = await db.getBookDetails(req.params.id);
    res.render('editBookForm', {data: data})
}

module.exports = {
    getIndexPage,
    getCreateForm,
    postBookOrVideoGame,
    getAddBookForm,
    postAddBook,
    getEditBookForm,
}