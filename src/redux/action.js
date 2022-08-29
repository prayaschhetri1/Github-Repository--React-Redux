import * as types from "./actionType";
import axios from "axios";
export const getData = (payload) => (dispatch) => {
  dispatch({ type: types.SEARCHED_DATA_LOADING });
  return axios
    .get(`https://api.github.com/users/${payload}/repos`)
    .then((res) => {
      return dispatch({ type: types.SEARCHED_DATA_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      return dispatch({ type: types.SEARCHED_DATA_FAILURE });
    });
};

export const getFollowers = (payload) => (dispatch) => {
  dispatch({ type: types.FOLLOWERS_DATA_LOADING });
  return axios
    .get(`${payload}`)
    .then((res) => {
      return dispatch({
        type: types.FOLLOWERS_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((e) => {
      return dispatch({ type: types.SEARCHED_DATA_FAILURE });
    });
};
