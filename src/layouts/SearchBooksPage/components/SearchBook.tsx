import { useState, useEffect } from "react";
import BookModel from "../../../models/BookModel";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  const baseUrl: string = "http://localhost:8080/api/v1";

  const imageUrl: string = `${baseUrl}?key=${props.book.img}`;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      } else {
        setIsLoading(false);
      }
    };

    fetchBooks().catch((error: any) => {
      setIsLoading(false);
    });
  }, [imageUrl]);

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {isLoading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {props.book.img ? (
              <img src={imageUrl} width="123" height="196" alt="Book" />
            ) : (
              <img
                src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                width="123"
                height="196"
                alt="Book"
              />
            )}
          </div>
          <div
            className="d-lg-none d-flex justify-content-center 
                        align-items-center"
          >
            {props.book.img ? (
              <img src={imageUrl} width="123" height="196" alt="Book" />
            ) : (
              <img
                src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                width="123"
                height="196"
                alt="Book"
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className="card-text">{props.book.description}</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <a className="btn btn-md main-color text-white" href="#">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};
