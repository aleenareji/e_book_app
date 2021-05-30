  
export const RETRIEVE_BOOKS_BEGIN = 'RETRIEVE_BOOKS_BEGIN';
export const RETRIEVE_BOOKS_SUCCESS = 'RETRIEVE_BOOKS_SUCCESS';
export const RETRIEVE_BOOKS_FAILURE = 'RETRIEVE_BOOKS_SUCCESS';


export const retrieveBooksBegin = () => {
    return {
      type: RETRIEVE_BOOKS_BEGIN,
    };
  };
  export const retrieveBooksSuccess = books => {
    return {
      type: RETRIEVE_BOOKS_SUCCESS,
      books: books,
    };
  };
  export const retrievBooksFailure = () => {
    return {
      type: RETRIEVE_BOOKS_FAILURE,
    };
  };