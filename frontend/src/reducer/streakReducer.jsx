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

export const getDetailStreakReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_DETAIL_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_DETAIL_STREAK_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case GET_DETAIL_STREAK_FAIL:
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

export const addStreakCountReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_STREAK_COUNT_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case ADD_STREAK_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case ADD_STREAK_COUNT_FAIL:
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

export const promtAiReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_AI_PROMPT_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_AI_PROMPT_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case GET_AI_PROMPT_FAIL:
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

export const deleteStreakReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case DELETE_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case DELETE_STREAK_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case DELETE_STREAK_FAIL:
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

export const updateStreakReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case UPDATE_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case UPDATE_STREAK_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: actions.payload,
      };
    case UPDATE_STREAK_FAIL:
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
