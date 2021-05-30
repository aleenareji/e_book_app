import { combineReducers } from "redux";
import reducer from "../redux/reducer";

const reducerMap = {
  books: reducer, 
};


export default combineReducers(reducerMap);
