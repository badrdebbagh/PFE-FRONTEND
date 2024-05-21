import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authentication/Reducer";
import { sous_cahierReducer } from "./SousCahierDeTest/Reducer";


const rootReducer = combineReducers({
  auth: authReducer,
  sous_cahier: sous_cahierReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


