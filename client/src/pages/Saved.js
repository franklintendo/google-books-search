import React, { useEffect, useState } from "react";
import API from "../utils/API";

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
            <div className="container">
                <div className="row">
                    
                        {!saved.length ? "No books to show" : 
                            saved.map(book => {
                                return (
                                    <div className="col" key={book._id}>
                                        {!book.image ? "No Img" : 
                                    (<img src={book.image} alt={book.title} />)}
                                        <p>{book.title}</p>
                                        <p>{book.authors}</p>
                                        <p>{book.description}</p>
                                        <p>{book.link}</p>
                                    </div>
                                );
                            })
                        }
                    
                </div>
            </div>
        </div>
    )
}

export default Saved;