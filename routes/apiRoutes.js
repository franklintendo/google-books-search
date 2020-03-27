const router = require("express").Router();
const axios = require("axios");
const booksController = require("../controllers/booksController");

router.get("/books/:id", (req,res) => {
  const queryUrl = `https://www.googleapis.com/books/v1/volumes?q=${req.params.id}`;

  axios.get(queryUrl)
  .then(response => res.send(response.data))
  .catch(err => res.status(404).send("Something went wrong"));
});

router.post("/saved", booksController.create);
router.get("/saved", booksController.findAll);


module.exports = router;