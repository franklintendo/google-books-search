import React, { useState } from "react";
import API from "../utils/API";

function Search() {

    const [books, setBooks] = useState([]);
    const [BookSearch, setBookSearch] = useState("");

    const handleInputChange = event => {
        event.preventDefault();
        const { value } = event.target;
        setBookSearch(value);
    }

    const handleSearchClick = event => {
        event.preventDefault();
        // When the search button is clicked,
        // make API call for the search term
        API.getSearch(BookSearch)
          .then(res => {
              setBooks(res.data.items);
              console.log(books);
            })
          .catch(err => console.log(err));
        // console.log(BookSearch)
        document.getElementById("search-input").value = "";
      };

    const preventReload = event => {
        if (event.key === "Enter" && !BookSearch) {
            event.preventDefault();
        } else if (event.key === "Enter" && BookSearch) {
            handleSearchClick(event);
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Book Search</h3>

                    <form className="input-group mb-3">
                        <input id="search-input" onChange={handleInputChange} type="text" className="form-control" placeholder="Search" aria-label="Search" onKeyDown={preventReload}  aria-describedby="search-button" />
                        <div className="input-group-append">
                            <button onClick={handleSearchClick} className="btn btn-outline-secondary" type="button" id="search-button">Search</button>
                        </div>
                    </form>
                </div>
                <div className="col-12">
                    
                    {!books.length ? (<h1 className="text-center">No Books to Display</h1>) : (
                        books.map(book => {
                            return (
                                <div key={book.id}>
                                {!book.volumeInfo.imageLinks.thumbnail ? "No Img" : 
                                (<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />)}
                                <p>id: {book.id}</p>
                                <p>title: {book.volumeInfo.title}</p>
                                <p>authors: {book.volumeInfo.authors}</p>
                                <p>description: {book.volumeInfo.description}</p>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search;