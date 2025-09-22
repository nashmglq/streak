import axios from "axios";
import {
  ADD_STREAK_COUNT_FAIL,
  ADD_STREAK_COUNT_REQUEST,
  ADD_STREAK_COUNT_SUCCESS,
  ADD_STREAK_COUNT_RESET,
  DELETE_STREAK_FAIL,
  DELETE_STREAK_REQUEST,
  DELETE_STREAK_SUCCESS,
  DELETE_STREAK_RESET,
  GET_AI_PROMPT_FAIL,
  GET_AI_PROMPT_REQUEST,
  GET_AI_PROMPT_SUCCESS,
  GET_AI_PROMPT_RESET,
  GET_DETAIL_STREAK_FAIL,
  GET_DETAIL_STREAK_REQUEST,
  GET_DETAIL_STREAK_SUCCESS,
  GET_DETAIL_STREAK_RESET,
  GET_STREAK_FAIL,
  GET_STREAK_REQUEST,
  GET_STREAK_SUCCESS,
  GET_STREAK_RESET,
  POST_STREAK_FAIL,
  POST_STREAK_REQUEST,
  POST_STREAK_SUCCESS,
  POST_STREAK_RESET,
  UPDATE_STREAK_FAIL,
  UPDATE_STREAK_REQUEST,
  UPDATE_STREAK_SUCCESS,
  UPDATE_STREAK_RESET,
} from "../constants/streakConstatns";
const baseUrl = process.env.REACT_APP_API_URL;

export const postStreakActions = (formData) => async (dispatch) => {
  try {
    dispatch({ type: POST_STREAK_RESET });
    dispatch({ type: POST_STREAK_REQUEST });

    const response = await axios.post(`${baseUrl}/streak-post`, formData, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
    });

    if (response && response.data.success) {
      return dispatch({
        type: POST_STREAK_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: POST_STREAK_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};

export const getStreakActions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_STREAK_RESET });
    dispatch({ type: GET_STREAK_REQUEST });

    const response = await axios.get(`${baseUrl}/streak-get`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.data && response.data.success) {
      dispatch({
        type: GET_STREAK_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: GET_STREAK_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};

export const getDetailStreakActions = (streakId) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_STREAK_RESET });
    dispatch({ type: GET_DETAIL_STREAK_REQUEST });

    const response = await axios.get(`${baseUrl}/streak-get/${streakId}`, {
      withCredentials: true,
      Accept: "application/json",
    });

    if (response.data && response.data.success) {
            dispatch({type: POST_STREAK_RESET})
      dispatch({
        type: GET_DETAIL_STREAK_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    dispatch({ type: POST_STREAK_RESET });
    return dispatch({
      type: GET_DETAIL_STREAK_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};

export const addStreakCountActions = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_STREAK_COUNT_RESET });
    dispatch({ type: ADD_STREAK_COUNT_REQUEST });

    const streakId = formData.streakId;

    const response = await axios.post(`${baseUrl}/streak-add-count`, formData, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.data && response.data.success) {
      dispatch(getDetailStreakActions(streakId));
      dispatch(promtAiActions(streakId));
      return dispatch({
        type: ADD_STREAK_COUNT_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: ADD_STREAK_COUNT_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};

export const promtAiActions = (streakId) => async (dispatch) => {
  try {
    dispatch({ type: GET_AI_PROMPT_RESET });
    dispatch({ type: GET_AI_PROMPT_REQUEST });

    const response = await axios.get(`${baseUrl}/streak-get-ai/${streakId}`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
    });
    if (response.data && response.data.success) {
      return dispatch({
        type: GET_AI_PROMPT_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: GET_AI_PROMPT_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};

export const deleteStreakActions = (streakId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STREAK_RESET });
    dispatch({ type: DELETE_STREAK_REQUEST });

    const response = await axios.delete(
      `${baseUrl}/streak-delete/${streakId}`,
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.data && response.data.success) {
      dispatch(getStreakActions());
      return dispatch({
        type: DELETE_STREAK_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: DELETE_STREAK_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};

export const updateStreakActions = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STREAK_RESET });
    dispatch({ type: UPDATE_STREAK_REQUEST });

    const response = await axios.put(`${baseUrl}/streak-update`, formData, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.data && response.data.success) {
      return dispatch({
        type: UPDATE_STREAK_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
    return dispatch({
      type: UPDATE_STREAK_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};
