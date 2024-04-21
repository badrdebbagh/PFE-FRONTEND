import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "@reduxjs/toolkit";
import { authReducer } from "./authentication/Reducer";
import { thunk } from "redux-thunk";

const rooteReducer = combineReducers({
  auth: authReducer,
});

export const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));
