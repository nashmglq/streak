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

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: [],
};

export const postStreakReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case POST_STREAK_SUCCESS:
      return { loading: false, success: true, error: false, message: action.payload };
    case POST_STREAK_FAIL:
      return { loading: false, success: false, error: true, message: action.payload };
    case POST_STREAK_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const getStreakReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_STREAK_SUCCESS:
      return { loading: false, success: true, error: false, message: action.payload };
    case GET_STREAK_FAIL:
      return { loading: false, success: false, error: true, message: action.payload };
    case GET_STREAK_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const getDetailStreakReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_DETAIL_STREAK_SUCCESS:
      return { loading: false, success: true, error: false, message: action.payload };
    case GET_DETAIL_STREAK_FAIL:
      return { loading: false, success: false, error: true, message: action.payload };
    case GET_DETAIL_STREAK_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const addStreakCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STREAK_COUNT_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case ADD_STREAK_COUNT_SUCCESS:
      return { loading: false, success: true, error: false, message: action.payload };
    case ADD_STREAK_COUNT_FAIL:
      return { loading: false, success: false, error: true, message: action.payload };
    case ADD_STREAK_COUNT_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const promtAiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AI_PROMPT_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case GET_AI_PROMPT_SUCCESS:
      return { loading: false, success: true, error: false, message: action.payload };
    case GET_AI_PROMPT_FAIL:
      return { loading: false, success: false, error: true, message: action.payload };
    case GET_AI_PROMPT_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const deleteStreakReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case DELETE_STREAK_SUCCESS:
      return { loading: false, success: true, error: false, message: action.payload };
    case DELETE_STREAK_FAIL:
      return { loading: false, success: false, error: true, message: action.payload };
    case DELETE_STREAK_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const updateStreakReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STREAK_REQUEST:
      return { loading: true, success: false, error: false, message: [] };
    case UPDATE_STREAK_SUCCESS:
      return { loading: false, success: true, error: false, message: action.payload };
    case UPDATE_STREAK_FAIL:
      return { loading: false, success: false, error: true, message: action.payload };
    case UPDATE_STREAK_RESET:
      return { ...initialState };
    default:
      return state;
  }
};
