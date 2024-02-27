import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./rootreducer";

const middleware = applyMiddleware(thunk);
export default createStore(rootReducer, {}, middleware);