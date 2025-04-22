import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {getProfileReducer, googleAuthReducer} from "./reducer/authReducer";
import { getDetailStreakReducer, getStreakReducer, postStreakReducer } from "./reducer/streakReducer";

const reducer = combineReducers({
  googleAuth : googleAuthReducer,
  getProfile : getProfileReducer,
  postStreak : postStreakReducer,
  getStreak : getStreakReducer,
  getDetailStreak : getDetailStreakReducer
});

const preloadedState = {};
const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
