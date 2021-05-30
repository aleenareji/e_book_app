
import {
    RETRIEVE_BOOKS_BEGIN,
    RETRIEVE_BOOKS_SUCCESS,
    RETRIEVE_BOOKS_FAILURE,
  
  } from './book.actions';
  const initialState = {
    retrieveBooksBegin: false,
    retrieveBooksFailure: false,
    getBooks: [],
  };
  export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
    
  
  
      case RETRIEVE_BOOKS_BEGIN:
        return {
          ...state,
          retrieveBooksBegin: true,
          retrieveBooksuccess: false,
          retrieveBooksFailure: false,
        };
      case RETRIEVE_BOOKS_SUCCESS:
        return {
          ...state,
          retrieveBooksBegin: false,
          retrieveBooksuccess: true,
          retrieveBooksFailure: false,
          getBooks: [...action.books],
        };
      case RETRIEVE_BOOKS_FAILURE:
        return {
          ...state,
          retrieveBooksBegin: false,
          retrieveBooksuccess: false,
          retrieveBooksFailure: true,
        };
      default:
        newState = state;
        break;
    }
    return newState;
  }