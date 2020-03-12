const router = require("express").Router();
const axios = require("axios");

router.get("/books/:id", (req,res) => {
  const queryUrl = `https://www.googleapis.com/books/v1/volumes?q=${req.params.id}&key=AIzaSyAWlXVYB9JtE-sL59dE0Qw_WEz67I0T9Kk`;

  axios.get(queryUrl)
  .then(response => res.send(response.data))
  .catch(err => res.status(404).send("Something went wrong"));
});

router.get("/books", (req,res) => {
  res.send("hi");
});


module.exports = router;