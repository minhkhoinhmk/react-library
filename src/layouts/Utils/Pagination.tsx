export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
  booksPerPage: number;
  defineBooksPerPage: any;
}> = (props) => {
  const pageNumbers: number[] = [];

  if (props.currentPage === 1) {
    pageNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    if (props.currentPage >= 3) {
      pageNumbers.push(props.currentPage - 2);
      pageNumbers.push(props.currentPage - 1);
    } else {
      pageNumbers.push(props.currentPage - 1);
    }

    pageNumbers.push(props.currentPage);

    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <nav aria-label="...">
            <ul className="pagination">
              {props.currentPage === 1 ? (
                <>
                  <li
                    className="page-item disabled"
                    onClick={() => props.paginate(1)}
                  >
                    <button className="page-link">
                      <i className="bi bi-chevron-double-left"></i>
                    </button>
                  </li>
                  <li className="page-item disabled">
                    <button className="page-link">
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="page-item" onClick={() => props.paginate(1)}>
                    <button className="page-link">
                      <i className="bi bi-chevron-double-left"></i>
                    </button>
                  </li>
                  <li
                    className="page-item"
                    onClick={() => props.paginate(props.currentPage - 1)}
                  >
                    <button className="page-link">
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>
                </>
              )}

              {pageNumbers.map((number) => (
                <li
                  key={number}
                  onClick={() => props.paginate(number)}
                  className={
                    "page-item " +
                    (props.currentPage === number ? "active" : "")
                  }
                >
                  <button className="page-link">{number}</button>
                </li>
              ))}

              {props.currentPage === props.totalPages ? (
                <>
                  <li className="page-item disabled">
                    <button
                      className="page-link"
                      disabled={props.currentPage === props.totalPages}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                  <li
                    className="page-item disabled"
                    onClick={() => props.paginate(props.totalPages)}
                  >
                    <button className="page-link">
                      <i className="bi bi-chevron-double-right"></i>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="page-item"
                    onClick={() => props.paginate(props.currentPage + 1)}
                  >
                    <button className="page-link">
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                  <li
                    className="page-item"
                    onClick={() => props.paginate(props.totalPages)}
                  >
                    <button className="page-link">
                      <i className="bi bi-chevron-double-right"></i>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div className="col-6 d-none d-sm-block">
          <div className="dropdown text-end">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {props.booksPerPage}
            </button>
            <span className="pl-2 ms-3">Books/Page</span>
            <ul className="dropdown-menu">
              <li
                onClick={() => {
                  props.defineBooksPerPage(5);
                }}
              >
                <a className="dropdown-item">5</a>
              </li>
              <li
                onClick={() => {
                  props.defineBooksPerPage(10);
                }}
              >
                <a className="dropdown-item">10</a>
              </li>
              <li onClick={() => props.defineBooksPerPage(20)}>
                <a className="dropdown-item">20</a>
              </li>
              <li onClick={() => props.defineBooksPerPage(50)}>
                <a className="dropdown-item">50</a>
              </li>
            </ul>
          </div>
        </div>

        {/* mobile*/}
        <div className="d-lg-none mb-2">
          <div className="col-12 col-md-1">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {props.booksPerPage}
              </button>
              <span className="pl-2 ms-3">Books/Page</span>
              <ul className="dropdown-menu">
                <li
                  onClick={() => {
                    props.defineBooksPerPage(5);
                  }}
                >
                  <a className="dropdown-item">5</a>
                </li>
                <li
                  onClick={() => {
                    props.defineBooksPerPage(10);
                  }}
                >
                  <a className="dropdown-item">10</a>
                </li>
                <li onClick={() => props.defineBooksPerPage(20)}>
                  <a className="dropdown-item">20</a>
                </li>
                <li onClick={() => props.defineBooksPerPage(50)}>
                  <a className="dropdown-item">50</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
