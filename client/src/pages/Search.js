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

        if (document.getElementById("search-loader")) {
            document.getElementById("search-loader").classList.remove(`d-none`);
            document.getElementById("search-loader").classList.add(`d-block`);
        }
        
        // When the search button is clicked,
        // make API call for the search term
        API.getSearch(BookSearch)
          .then(res => {
              const search = res.data.items.map(book => {
                  let bookObject = book.volumeInfo;
                  if (!bookObject.imageLinks) {
                    bookObject.imageLinks = { thumbnail: "https://via.placeholder.com/128x208?text=No+Image"}
                  }
                  
                  if (!bookObject.description) {
                    bookObject["description"] = "There is no description available for this book."
                  }

                console.log(bookObject.description);
                return book;
              });
              setBooks(search);
            })
          .catch(err => console.log(err));

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

                    
                    {!books.length ? (
                    
                    <div className="col-12 text-center py-5" id="no-results-container">
                        <div id="search-loader" className="mb-5 d-none">
                            <div className="spinner-border text-center" style={{width: "12rem", height: "12rem", color: "#3771c8"}} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        <img src={require("../img/nothing.png")} style={{height: "250px"}} />
                        <h1 className="text-center mt-3 headline" style={{color: "#3771c8"}}>No Books to Display</h1>
                    </div>
                    ) : (
                        books.map(book => {

                            return (
                                <div className="col-12 col-md-6 col-xl-4 mt-5" key={book.id}>
                                    <div className="d-block">
                                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="d-inline-block book-image mb-5 mr-4 pb-sm-5" />
                                    
                                        <div className="book-deets py-2 px-3 rounded-right">
                                            <p className="book-title my-1 text-left">{book.volumeInfo.title}</p>
                                            <p className="book-authors text-left mb-0">
                                                By&nbsp; 
                                            {book.volumeInfo.authors.map(author => {
                                                return (<span><span>,&nbsp;</span>{author}</span>)
                                            })}</p>
                                        </div>
                                        <p className="my-3">
                                            {
                                            book.volumeInfo.description.length > 149 ?
                                            (<span>{book.volumeInfo.description.substring(0, 149)}...</span>)
                                            :
                                            (<span>{book.volumeInfo.description}</span>)
                                            
                                            }
                                        </p>
                                        

                                        
                                    </div>
                                    <div className="text-right">
                                        <a href={book.volumeInfo.infoLink} target="_blank" className="btn btn-secondary mr-3" rel="noopener noreferrer">
                                            Read More...
                                        </a>
                                        <button 
                                                data-book_id={book.id}  
                                                data-book_img={book.volumeInfo.imageLinks.thumbnail} 
                                                data-book_title={book.volumeInfo.title}
                                                data-book_authors={book.volumeInfo.authors}
                                                data-book_description={book.volumeInfo.description}
                                                data-book_link={book.volumeInfo.infoLink}
                                                onClick={saveBook}
                                                className="btn btn-primary"
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