import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "@reduxjs/toolkit";
import { authReducer } from "./authentication/Reducer";
import { thunk } from "redux-thunk";
import { sous_cahierReducer } from "./SousCahierDeTest/Reducer";

const rooteReducer = combineReducers({
  auth: authReducer,
  sous_cahier: sous_cahierReducer,
});

export const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));
