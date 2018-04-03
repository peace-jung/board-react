import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  comment: {
    status: "INIT",
    contents: ""
  }
};

export default function comment(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    /* Write Comments */
    case types.WRITE_COMMENT:
      return update(state, {
        comment: {
          status: {
            $set: "WAIT"
          }
        }
      });

    case types.WRITE_COMMENT_SUCCESS:
      return update(state, {
        comment: {
          status: {
            $set: "SUCCESS"
          },
          contents: {
            $set: action.post
          }
        }
      });

    case types.WRITE_COMMENT_FAILURE:
      return update(state, {
        comment: {
          status: {
            $set: "FAILURE"
          }
        }
      });

    default: return state;
  }
}