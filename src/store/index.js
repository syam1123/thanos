import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import appReducer from "../reducers/index";
import { routerReducer } from 'react-router-redux'

const logger = createLogger();

export default function configureStore (initialState) {
  const store = createStore(
    combineReducers({
      appReducer,
      routing: routerReducer
    }),
    initialState,
    compose(
      applyMiddleware(thunk, logger)
    ));
  return store;
}
