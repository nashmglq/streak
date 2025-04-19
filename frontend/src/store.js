import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const reducer = combineReducers({
    
})
const intialState = {}; // initial state which can be used in our reducers

// User likes the post -> USER_REQUEST action triggers middleware
// -> Thunk checks everything (e.g., user login) before sending the like request to the backend
// -> If all good, backend updates and boom! Like count is updated on the frontend.

const middleware = [thunk];

const store = configureStore({
  // put all here to export everthing
  reducer,
  intialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;