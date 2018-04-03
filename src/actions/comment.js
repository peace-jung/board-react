import axios from 'axios';
import * as types from './ActionTypes';

/* Write Comments */
export function writeComment() {
  return {type: types.WRITE_COMMENT};
}

export function writeCommentSuccess() {
  return {type: types.WRITE_COMMENT_SUCCESS};
}

export function writeCommentFailure() {
  return {type: types.WRITE_COMMENTT_FAILURE};
}

export function writeCommentRequest(id, comment) {
    
  return (dispatch) => {
    dispatch(writeComment());

    return axios
      .post("/api/post/comment", {id, comment})
      .then((res) => {
        dispatch(writeCommentSuccess());
      })
      .catch((err) => {
        dispatch(writeCommentFailure());
      });
  };
}