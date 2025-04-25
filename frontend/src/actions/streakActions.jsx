import axios from "axios";
import {
  ADD_STREAK_COUNT_FAIL,
  ADD_STREAK_COUNT_REQUEST,
  ADD_STREAK_COUNT_SUCCESS,
  GET_DETAIL_STREAK_FAIL,
  GET_DETAIL_STREAK_REQUEST,
  GET_DETAIL_STREAK_SUCCESS,
  GET_STREAK_FAIL,
  GET_STREAK_REQUEST,
  GET_STREAK_SUCCESS,
  POST_STREAK_FAIL,
  POST_STREAK_REQUEST,
  POST_STREAK_SUCCESS,
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
    console.log(getToken);
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
    console.log(getToken);
    const token = getToken ? getToken.token : null;
    const config = token
      ? {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : null;

        console.log(streakId)
    const response = await axios.get(
      `${baseUrl}/streak-get/${streakId}`,
      config
    );

    if (response.data && response.data.success) {
      console.log(response.data.success)
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



export const addStreakCountActions = (formData) => async(dispatch) => {
  try{

    dispatch({type: ADD_STREAK_COUNT_REQUEST})
    const streakId = formData.streakId
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

      const response = await axios.post(`${baseUrl}/streak-add-count`, formData, config)

      if(response.data && response.data.success){
        dispatch(getDetailStreakActions(streakId))
        return dispatch({type: ADD_STREAK_COUNT_SUCCESS, payload: response.data.success})
      }
    

  }catch(err){
    return dispatch({
      type: ADD_STREAK_COUNT_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
}