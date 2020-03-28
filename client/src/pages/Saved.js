import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";

function Saved() {

    const [saved, setSaved] = useState([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        API.getSaved()
        .then(res => setSaved(res.data))        
        .catch(err => console.log(err));
    }

    console.log(saved);

    return(
        <div>
            <div className="container-fluid">
                <div className="row justify-content-center search-top py-5">
                    <div className="col-md-6 col-lg-4">
                        <h2 className="text-center">Saved Books</h2>
                        <p className="text-center mb-0"><Link className="link-page" to="/"><i class="fas fa-search"></i>&nbsp; Search For Books</Link></p>
                    </div>
                </div>
                

                        {!saved.length ? (
                            <div className="row justify-content-center">
                                <img src={require("../img/nothing.png")} style={{height: "250px"}} alt="No saved" />
                                <h1 className="text-center mt-3 headline" style={{color: "#3771c8"}}>You have no saved books</h1>
                            </div>
                        ) : 
                            saved.map(book => {
                                return (
                                    <div className="row justify-content-center">
                                        <div class="media col-12 col-md-8 col-xl-6 py-5 border-top">
                                            <img class="mr-4" src={book.image} alt={book.title} style={{width: "87px"}} />
                                            <div class="media-body">
                                                <p className="book-title my-1 text-left">{book.title}</p>
                                                <p className="book-authors text-left mb-0">
                                                By {book.authors}
                                                </p>
                                                <p className="mt-3">
                                                    {book.description}
                                                </p>
                                                <a href={book.link} target="_blank" className="btn btn-secondary" rel="noopener noreferrer">
                                                Read More...
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                   
            </div>
        </div>
    )
}

export default Saved;