import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { getProfileReducer, googleAuthReducer } from "./reducer/authReducer";
import {
  getDetailStreakReducer,
  getStreakReducer,
  postStreakReducer,
  promtAiReducer,
} from "./reducer/streakReducer";

const appReducer = combineReducers({
  googleAuth: googleAuthReducer,
  getProfile: getProfileReducer,
  postStreak: postStreakReducer,
  getStreak: getStreakReducer,
  getDetailStreak: getDetailStreakReducer,
  promtAi: promtAiReducer
});

//rootReducer resets the entire Redux state by passing 
// undefined to the combined reducer when the "RESET_STATE" action is dispatched, clearing all state.
const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const preloadedState = {};
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;


