import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
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

  if (isLoading) {
    return (
      <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div className="text-center">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {/* {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )} */}
        {props.book.img ? (
          <img src={imageUrl} width="151" height="233" alt="book" />
        ) : (
          <img
            src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
            width="151"
            height="233"
            alt="book"
          />
        )}
        <h6 className="mt-2">{props.book.title}</h6>
        <p>{props.book.author}</p>
        <a className="btn main-color text-white" href="/">
          Reserve
        </a>
      </div>
    </div>
  );
};
