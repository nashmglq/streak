import axios from "axios";
import {
  ADD_STREAK_COUNT_FAIL,
  ADD_STREAK_COUNT_REQUEST,
  ADD_STREAK_COUNT_SUCCESS,
  DELETE_STREAK_FAIL,
  DELETE_STREAK_REQUEST,
  DELETE_STREAK_SUCCESS,
  GET_AI_PROMPT_FAIL,
  GET_AI_PROMPT_REQUEST,
  GET_AI_PROMPT_SUCCESS,
  GET_DETAIL_STREAK_FAIL,
  GET_DETAIL_STREAK_REQUEST,
  GET_DETAIL_STREAK_SUCCESS,
  GET_STREAK_FAIL,
  GET_STREAK_REQUEST,
  GET_STREAK_SUCCESS,
  POST_STREAK_FAIL,
  POST_STREAK_REQUEST,
  POST_STREAK_SUCCESS,
  UPDATE_STREAK_FAIL,
  UPDATE_STREAK_REQUEST,
  UPDATE_STREAK_SUCCESS,
} from "../constants/streakConstatns";
const baseUrl = "http://localhost:5000";

export const postStreakActions = (formData) => async (dispatch) => {
  try {
    dispatch({ type: POST_STREAK_REQUEST });

    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

    const response = await axios.post(
      `${baseUrl}/streak-post`,
      formData,
      config
    );

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
    dispatch({ type: GET_STREAK_REQUEST });

    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

    const response = await axios.get(`${baseUrl}/streak-get`, config);

    if (response.data && response.data.success) {
      return dispatch({
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
    dispatch({ type: GET_DETAIL_STREAK_REQUEST });
    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

    const response = await axios.get(
      `${baseUrl}/streak-get/${streakId}`,
      config
    );

    if (response.data && response.data.success) {
      dispatch({
        type: GET_DETAIL_STREAK_SUCCESS,
        payload: response.data.success,
      });
    }
  } catch (err) {
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
    dispatch({ type: ADD_STREAK_COUNT_REQUEST });
    const streakId = formData.streakId;
    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

    const response = await axios.post(
      `${baseUrl}/streak-add-count`,
      formData,
      config
    );

    if (response.data && response.data.success) {
      dispatch(getDetailStreakActions(streakId));
      dispatch(promtAiActions(streakId))
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
    dispatch({ type: GET_AI_PROMPT_REQUEST });
    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

    const response = await axios.get(
      `${baseUrl}/streak-get-ai/${streakId}`,
      config
    );
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
    dispatch({ type: DELETE_STREAK_REQUEST });
    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;

    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

    const response = await axios.delete(
      `${baseUrl}/streak-delete/${streakId}`,
      config
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
    dispatch({ type: UPDATE_STREAK_REQUEST });
    const getToken = JSON.parse(localStorage.getItem("userInfo"));
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

      console.log(formData)
    const response = await axios.put(
      `${baseUrl}/streak-update`,
      formData,
      config
    );

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
