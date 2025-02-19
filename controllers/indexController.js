const db = require('../db/queries');


const getIndexPage =  async (req, res) => {
    const data = await db.getAllBookInfo();
    res.render('index', {data: data});
};



module.exports = {
    getIndexPage,

}