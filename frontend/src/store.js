import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {getProfileReducer, googleAuthReducer} from "./reducer/authReducer";
import { getStreakReducer, postStreakReducer } from "./reducer/streakReducer";

const reducer = combineReducers({
  googleAuth : googleAuthReducer,
  getProfile : getProfileReducer,
  postStreak : postStreakReducer,
  getStreak : getStreakReducer
});

const preloadedState = {};
const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
