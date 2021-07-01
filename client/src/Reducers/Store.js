import { createStore, applyMiddleware } from "redux";
import RootReducer from "./Root.Reducer";
import thunk from "redux-thunk";

const store = createStore(RootReducer, applyMiddleware(thunk));

export default store;
