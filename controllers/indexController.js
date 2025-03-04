const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("title")
    .trim()
    .matches(/^[a-z0-9 ]+$/i)
    .withMessage("Title name must be an alphanumeric value."),
  body("author")
    .trim()
    .matches(/^[a-z0-9 ]+$/i)
    .withMessage("Author name must be an alphanumeric value."),
  body("publisher")
    .trim()
    .matches(/^[a-z0-9 ]+$/i)
    .withMessage("Publisher name must be an alphanumeric value."),
  body("quantity")
    .trim()
    .isNumeric()
    .withMessage("Quantity must be a number.")
    .isFloat({ min: 0 })
    .withMessage("Quantity must be a positive number.")
    .custom((value) => (value % 1 == 0 ? true : false))
    .withMessage("Quantity must be a whole number (i.e., no decimals)."),
  body("imageUrl")
    .trim()
    // .isURL()
    // .withMessage("Image submission must be an ImageURL"),
    ,
  body("description")
    .isLength({ min: 0, max: 400 })
    .withMessage("Description of book must be between 0 and 400 characters."),
];

const getIndexPage = async (req, res) => {
  const data = await db.getLimitedBookInfo();
  res.render("index", { data: data });
};

const getCreateForm = async (req, res) => {
  res.render("createItemForm", { title: "Add Items" });
};

const postBookOrVideoGame = async (req, res) => {
  if (req.body.itemType == "book") {
    res.redirect("/create/add-book");
  } else if (req.body.itemType == "videogame") {
    res.redirect("/create/add-videogame");
  }
};

const postAddBook = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("add-book-form", { errors: errors.array(), data: req.body });
    }

    const { title, author, publisher, quantity, description, imageUrl } =
      req.body;
    const newBookArr = [
      title,
      author,
      publisher,
      quantity,
      description,
      imageUrl,
    ];
    console.log(req.body.genre_type)
    const idVal = await db.postBook(newBookArr);
    // await db.postBook(newBookArr);

   await req.body.genre_type.forEach(async element => {
        await db.postGenre(idVal, element)
    });
    
    setTimeout(() => {
        res.redirect("/");
    }, 3000)

  },
];

const getAddBookForm = (req, res) => {
  res.render("add-book-form");
};

const getEditBookForm = async (req, res) => {
  const data = await db.getBookDetails(req.params.id);
  res.render("editBookForm", { data: data });
};

const postEditBookForm = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("editBookForm", {
          errors: errors.array(),
          data: [
            {
              id: req.params.id,
              title: req.body.title,
              author: req.body.author,
              publisher: req.body.publisher,
              quantity: req.body.quantity,
              description: req.body.description,
              cover_image_url: req.body.imageUrl,
            },
          ],
        });
    }
    await db.updateBookDetails(req.params.id, [
      req.body.title,
      req.body.author,
      req.body.publisher,
      req.body.quantity,
      req.body.description,
      req.body.imageUrl,
    ]);
    res.redirect("/");
  },
];

const getDeleteBookForm = async (req, res) => {
    const data = await db.getDeleteBookImage(req.params.id);
    res.render('deleteBookForm', {id: req.params.id,title: req.params.title, cover_image_url: data[0].cover_image_url || '/missing_book.png'});
}

const postDeleteBook = async (req, res) => {
    if(req.body.adminPass == process.env.ADMIN_PASS) {
        await db.deleteBook(req.params.id);
        res.redirect('/');
        return
    } else {
        const data = await db.getDeleteBookImage(req.params.id);
        res.render('deleteBookForm', {id: req.params.id, title: req.params.title, cover_image_url: data[0].cover_image_url || '/missing_book.png', errors: [{msg: 'Wrong Password.'}]})
    }
    
}

const getBooksPage = async (req, res) => {
    const data = await db.getAllBookInfo();
    res.render("books", { data: data });
}

module.exports = {
  getIndexPage,
  getCreateForm,
  postBookOrVideoGame,
  getAddBookForm,
  postAddBook,
  getEditBookForm,
  postEditBookForm,
  getDeleteBookForm,
  postDeleteBook,
  getBooksPage,
};
