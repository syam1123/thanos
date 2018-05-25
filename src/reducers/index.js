import {combineReducers} from "redux";
import contacts from './contacts'

const appReducer = combineReducers({
  contacts
});

export default appReducer;
