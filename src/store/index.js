import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import calculator from "./calculator";

const reducer = combineReducers({
  calculator,
});
const store = configureStore({
  reducer,
});
export default store;
