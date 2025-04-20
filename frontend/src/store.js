import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {getProfileReducer, googleAuthReducer} from "./reducer/authReducer";

const reducer = combineReducers({
  googleAuth : googleAuthReducer,
  getProfile : getProfileReducer
});

const preloadedState = {};
const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
