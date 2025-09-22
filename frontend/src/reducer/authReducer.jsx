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

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: [],
};

export const googleAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GOOGLE_AUTH_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_GOOGLE_AUTH_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: action.payload,
      };
    case GET_GOOGLE_AUTH_FAIL:
      return {
        loading: false,
        success: false,
        error: true,
        message: action.payload,
      };
    case GET_GOOGLE_AUTH_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const getProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: action.payload,
      };
    case GET_PROFILE_FAIL:
      return {
        loading: false,
        success: false,
        error: true,
        message: action.payload,
      };
    case GET_PROFILE_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const authCheckReducer = (
  state = {
    loading: false,
    success: false,
    error: false,
    message: [],
    login: false,
  },
  action
) => {
  switch (action.type) {
    case AUTH_CHECK_REQUEST:
      return { ...state, loading: true, success: false, error: false, message: [] };
    case AUTH_CHECK_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: action.payload,
        login: true,
      };
    case AUTH_CHECK_FAIL:
      return {
        loading: false,
        success: false,
        error: true,
        message: action.payload,
        login: false,
      };
    case AUTH_CHECK_RESET:
      // spread and just pick what u want to change, if all just use spread.
      return { ...state, loading: false, success: false, error: false, message: [] };
    default:
      return state;
  }
};

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        loading: false,
        success: false,
        error: true,
        message: action.payload,
      };
    case LOGOUT_RESET:
      return { ...initialState };
    default:
      return state;
  }
};
