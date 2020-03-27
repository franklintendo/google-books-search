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
              console.log(res.data.items);
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

    const saveBook = event => {
        event.preventDefault();
        API.saveBook({
            title: event.target.dataset.book_title,
            authors: event.target.dataset.book_authors,
            description: event.target.dataset.book_description,
            image: event.target.dataset.book_img,
            link: event.target.dataset.book_link
        })
        .then(res => console.log(res));
    }

    return(
        <div className="container-fluid h-100">
            <div className="row justify-content-center search-top py-5">
                <div className="col-md-6 col-lg-4">
                    <h2>Book Search</h2>

                    <form className="input-group mb-3 mt-3">
                        <input id="search-input" onChange={handleInputChange} type="text" className="form-control" placeholder="Search" aria-label="Search" onKeyDown={preventReload}  aria-describedby="search-button" />
                        <div className="input-group-append">
                            <button onClick={handleSearchClick} className="btn btn-outline-light" type="button" id="search-button">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">

                    
                    {!books.length ? (<h1 className="text-center">No Books to Display</h1>) : (
                        books.map(book => {
                            return (
                                <div className="col-3" key={book.id}>
                                    
                                    {!book.volumeInfo.imageLinks.thumbnail ? "No Img" : 
                                    (<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="d-inline-block" />)}
                                    <div className="d-inline-block">
                                        <p>title: {book.volumeInfo.title}</p>
                                        <p>authors: {book.volumeInfo.authors}</p>
                                        <p>description: {book.volumeInfo.description}</p>
                                        

                                        <button 
                                            data-book_id={book.id}  
                                            data-book_img={!book.volumeInfo.imageLinks.thumbnail ? null : book.volumeInfo.imageLinks.thumbnail} 
                                            data-book_title={book.volumeInfo.title}
                                            data-book_authors={book.volumeInfo.authors}
                                            data-book_description={book.volumeInfo.description}
                                            data-book_link={book.volumeInfo.infoLink}
                                            onClick={saveBook}
                                        >
                                                
                                                Save
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    )}

            </div>
        </div>
    )
}

export default Search;