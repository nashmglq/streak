import {
  GET_GOOGLE_AUTH_FAIL,
  GET_GOOGLE_AUTH_REQUEST,
  GET_GOOGLE_AUTH_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
} from "../constants/authConstants";

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: [],
};

export const googleAuthReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_GOOGLE_AUTH_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_GOOGLE_AUTH_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case GET_GOOGLE_AUTH_FAIL:
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

export const getProfileReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_PROFILE_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case GET_PROFILE_FAIL:
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


