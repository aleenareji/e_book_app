import {
    retrieveBooksBegin,
    retrieveBooksSuccess,
 
} from './book.actions';
import Data from '../modules/HomePage/data';



export function retrieveBooks() {
    /* 
    Now Mock action implemented */
    return dispatch => {
      dispatch(retrieveBooksBegin());
      const promise = new Promise((resolve, reject) => {
        dispatch(retrieveBooksSuccess(Data));
        resolve('success');
      });
      return promise;
    };
  }