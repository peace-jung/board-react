import axios from 'axios';
import * as types from './ActionTypes';

/* Write Posts */
export function writePost() {
  return {type: types.WRITE_POST};
}

export function writePostSuccess(post) {
  return {type: types.WRITE_POST_SUCCESS, post};
}

export function writePostFailure() {
  return {type: types.WRITE_POST_FAILURE};
}

export function writePostRequest(title, contents) {
    
  return (dispatch) => {
    dispatch(writePost());

    return axios
      .post('/api/post', { title, contents })
      .then((res) => {
        dispatch(writePostSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(writePostFailure());
      });
  };
}