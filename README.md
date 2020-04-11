# Google Books Search

### Overview

This project is a React-based Google Books Search app. It utilizes React components, helper/util functions, and React lifecycle methods to query and display books based on user searches. It also uses Node, Express and MongoDB so that users can save books to review or purchase later.

Link to project: <a href="https://stark-falls-12658.herokuapp.com/" target="_blank">Click here</a>

<div align="center">
  <img src="./screenshots/books-demo.gif" alt="Google Books Search">
</div>

### Summary

* This application is composed of 2 pages:

  * Search - User can search for books via the Google Books API and render them here. User has the option to "Read More," bringing them to the book on Google Books, or "Save" a book, saving it to the Mongo database.

  * Saved - Renders all books saved to the Mongo database. User has an option to "Read More," bringing them to the book on Google Books, or "Delete" a book, removing it from the Mongo database.


* The app connects to a MongoDB database named `googlebooks` using the mongoose npm package.

* The Book Schema using mongoose is as follows:

  * `title` - Title of the book from the Google Books API

  * `authors` - The books's author(s) as returned from the Google Books API

  * `description` - The book's description as returned from the Google Books API

  * `image` - The Book's thumbnail image as returned from the Google Books API

  * `link` - The Book's information link as returned from the Google Books API

* The `documents` in a user's saved `books` collection appear as such:

    ```js
    {
      authors: "J. K. Rowling"
      description: "Rescued from the outrageous neglect of his aunt and uncle, a young boy with a great destiny proves his worth while attending Hogwarts School for Witchcraft and Wizardry."
      image: "http://books.google.com/books/content?id=gqX7rQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      link: "http://books.google.com/books?id=gqX7rQEACAAJ&dq=:Harry+P&hl=&source=gbs_api"
      title: "Harry Potter and the Sorcerer's Stone"
    }
    ```

* The app is a SPA (Single Page Application) that uses [`react-router-dom`](https://github.com/reactjs/react-router) to navigate, hide and show the React components without changing the route within Express.



* The following Express routes are utilized:

  * `/api/books/:id` (get) - Returns all books that matches a user's search query.

  * `/api/saved` (get) - Returns all saved books as JSON.

  * `/api/saved` (post) - Will be used to save a new book to the database.

  * `/api/saved/:id` (delete) - Will be used to delete a book from the database by Mongo `_id`.

  * `*` (get) - Loads the single HTML page in `client/build/index.html`. 

Link to project: <a href="https://stark-falls-12658.herokuapp.com/" target="_blank">Click here</a>