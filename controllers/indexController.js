const db = require('../db/queries');


const getIndexPage =  async (req, res) => {
    const data = await db.getAllBookInfo();
    res.render('index', {data: data});
};

const getCreateForm = async (req, res) => {
    res.render('createItemForm', {title: 'Add Items'});
};



module.exports = {
    getIndexPage,
    getCreateForm,

}