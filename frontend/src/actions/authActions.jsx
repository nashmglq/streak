import axios from "axios";
import {
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAIL,
  AUTH_CHECK_RESET,
  GET_GOOGLE_AUTH_FAIL,
  GET_GOOGLE_AUTH_REQUEST,
  GET_GOOGLE_AUTH_SUCCESS,
  GET_GOOGLE_AUTH_RESET,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_RESET,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_RESET,
} from "../constants/authConstants";
import { POST_STREAK_RESET } from "../constants/streakConstatns";

const baseUrl = process.env.REACT_APP_API_URL;

export const googleAuthActions = (credential, nav) => async (dispatch) => {
  try {
    dispatch({ type: GET_GOOGLE_AUTH_RESET });
    dispatch({ type: GET_GOOGLE_AUTH_REQUEST });

    const response = await axios.post(
      `${baseUrl}/auth/google/verify`,
      credential,
      { withCredentials: true }
    );

    if (response && response.data.success) {
      nav("/dashboard");
      return dispatch({
        type: GET_GOOGLE_AUTH_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: GET_GOOGLE_AUTH_FAIL,
      payload: err.response?.data?.error || "Something went wrong.",
    });
  }
};

export const getProfileActions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_RESET });
    dispatch({ type: GET_PROFILE_REQUEST });

    const response = await axios.get(`${baseUrl}/profile`, {
      withCredentials: true,
      headers: { Accept: "application/json" },
    });

    if (response && response.data.success) {
      dispatch({ type: POST_STREAK_RESET });
      return dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: GET_PROFILE_FAIL,
      payload: err.response?.data?.error || "Something went wrong",
    });
  }
};

export const authCheckActions = () => async (dispatch) => {
  try {
    dispatch({ type: AUTH_CHECK_RESET });
    dispatch({ type: AUTH_CHECK_REQUEST });

    const response = await axios.get(`${baseUrl}/auth-check`, {
      withCredentials: true,
      headers: { Accept: "application/json" },
    });

    if (response.data && response.data.success) {
      return dispatch({
        type: AUTH_CHECK_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: AUTH_CHECK_FAIL,
      payload: err.response?.data?.error || "Something went wrong",
    });
  }
};

export const logoutActions = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_RESET });
    dispatch({ type: LOGOUT_REQUEST });

    const response = await axios.post(
      `${baseUrl}/logout`,
      {},
      {
        withCredentials: true,
        headers: { Accept: "application/json" },
      }
    );

    if (response.data && response.data.success) {
      dispatch({ type: POST_STREAK_RESET });
      return dispatch({
        type: LOGOUT_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: LOGOUT_FAIL,
      payload: err.response?.data?.error || "Something went wrong",
    });
  }
};
