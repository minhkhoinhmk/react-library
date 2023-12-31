import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totlalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [distinctCategories, setDistinctCategories] = useState<string[]>([]);
  const [categorySelection, setCategorySelection] = useState("Book Category");

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";

      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        console.log(searchWithPage);
        url = baseUrl + searchWithPage;
      }

      console.log(url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.books;

      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedBooks: BookModel[] = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          img: responseData[key].img,
          category: responseData[key].category,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };

    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, booksPerPage, searchUrl, categorySelection]);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";

      let categories: Set<string> = new Set();

      const categoryResponse = await fetch(baseUrl);

      if (!categoryResponse.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await categoryResponse.json();

      const responseData = responseJson._embedded.books;

      for (const key in responseData) {
        categories.add(responseData[key].category);
      }

      setDistinctCategories(Array.from(categories));
    };

    fetchBooks().catch((error: any) => {
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    setCurrentPage(1);

    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContainingIgnoreCase?title=${search}&page=<pageNumber>&size=${booksPerPage}`
      );
    }

    setCategorySelection("Book Category");
    paginate(1);
  };

  const categoryFeild = (value: string) => {
    setCurrentPage(1);

    if (value !== "") {
      if (value === "All") {
        setCategorySelection("All");
        setSearchUrl(`?page=<pageNumber>&size=5`);
      } else if (
        value === "FE" ||
        value === "BE" ||
        value === "Data" ||
        value === "DevOps"
      ) {
        setCategorySelection(value);
        setSearchUrl(
          `/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`
        );
      }

      paginate(1);
    }
  };

  const indexOfLatBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLatBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const defineBooksPerPage = (books: number) => {
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContainingIgnoreCase?title=${search}&page=<pageNumber>&size=${books}`
      );
    }

    if (categorySelection !== "") {
      if (categorySelection === "All") {
        setCategorySelection("All");
        setSearchUrl(`?page=<pageNumber>&size=${books}`);
      } else if (
        categorySelection === "FE" ||
        categorySelection === "BE" ||
        categorySelection === "Data" ||
        categorySelection === "DevOps"
      ) {
        setCategorySelection(categorySelection);
        setSearchUrl(
          `/search/findByCategory?category=${categorySelection}&page=<pageNumber>&size=${books}`
        );
      }
    }

    setBooksPerPage(books);
    setCurrentPage(1);

    paginate(1);
  };

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => categoryFeild("All")}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  {distinctCategories.map((category) => (
                    <li key={category} onClick={() => categoryFeild(category)}>
                      <a className="dropdown-item" href="#">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of results: ({totalAmountOfBooks})</h5>
              </div>
              <p>
                {indexOfFirstBook} to {lastItem} of {totalAmountOfBooks} items
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are looking for?</h3>
              <a
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                href="#"
              >
                Library Services
              </a>
            </div>
          )}

          {totlalPages >= 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totlalPages}
              paginate={paginate}
              booksPerPage={booksPerPage}
              defineBooksPerPage={defineBooksPerPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
