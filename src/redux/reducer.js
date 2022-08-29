import * as types from "./actionType";

const initialState = {
  user: [],
  isLoading: false,
  isError: false,
  followers: [],
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SEARCHED_DATA_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.SEARCHED_DATA_SUCCESS: {
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    }
    case types.SEARCHED_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case types.FOLLOWERS_DATA_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.FOLLOWERS_DATA_SUCCESS: {
      return {
        ...state,
        followers: payload,
        isLoading: false,
      };
    }
    case types.FOLLOWERS_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default:
      return state;
  }
};
