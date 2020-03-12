const router = require("express").Router();
const axios = require("axios");

router.get("/books/:id", (req,res) => {
  const queryUrl = `https://www.googleapis.com/books/v1/volumes?q=${req.params.id}&key=${process.env.API_KEY}`;

  axios.get(queryUrl)
  .then(response => res.send(response.data))
  .catch(err => res.status(404).send("Something went wrong"));
});

router.get("/books", (req,res) => {
  res.send("key: " + process.env.API_KEY);
});


module.exports = router;