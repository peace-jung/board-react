import axios from 'axios';
import * as types from './ActionTypes';

/* Get Cards */
export function getCards() {
  return {type: types.GET_CARDS};
}

export function getCardsSuccess(posts) {
  return {type: types.GET_CARDS_SUCCESS, posts};
}

export function getCardsFailure() {
  return {type: types.GET_CARDS_FAILURE};
}

export function getCardsRequest() {
  return (dispatch) => {
    dispatch(getCards());

    return axios
      .get('/api/post')
      .then((res) => {
        dispatch(getCardsSuccess(res.data.posts));
      })
      .catch((err) => {
        dispatch(getCardsFailure());
      });
  };
}

/* Get Selected Post */
export function getSelectedPost() {
  return {type: types.GET_SELECTED_POST};
}

export function getSelectedPostSuccess(post) {
  return {type: types.GET_SELECTED_POST_SUCCESS, post};
}

export function getSelectedPostFailure() {
  return {type: types.GET_SELECTED_POST_FAILURE};
}

export function getSelectedPostRequest(id) {
  return (dispatch) => {
    dispatch(getSelectedPost());

    return axios
      .get(`/api/post/${id}`)
      .then((res) => {
        dispatch(getSelectedPostSuccess(res.data.post));
      })
      .catch((err) => {
        dispatch(getSelectedPostFailure());
      });
  };
}