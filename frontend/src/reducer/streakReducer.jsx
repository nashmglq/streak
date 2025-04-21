import { act } from "react";
import {
  GET_STREAK_FAIL,
  GET_STREAK_REQUEST,
  GET_STREAK_SUCCESS,
  POST_STREAK_FAIL,
  POST_STREAK_REQUEST,
  POST_STREAK_SUCCESS,
} from "../constants/streakConstatns";

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: [],
};

export const postStreakReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case POST_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case POST_STREAK_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case POST_STREAK_FAIL:
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    default:
      return state;
  }
};

export const getStreakReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_STREAK_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case GET_STREAK_FAIL:
      return {
        loading: false,
        success: false,
        error: true,
        message: actions.payload,
      };
    default:
      return state;
  }
};
