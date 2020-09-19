import { createStore, applyMiddleware } from "redux";
import rootReducer from "../store/reducerManager";
import thunk from "redux-thunk";

let middlewares = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
