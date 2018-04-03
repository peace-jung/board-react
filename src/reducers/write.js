import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  write: {
    status: "INIT",
    post: {
      title: "",
      contents: ""
    }
  }
};

export default function post(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    /* writePost */
    case types.WRITE_POST:
      return update(state, {
        write: {
          status: {
            $set: "WAIT"
          }
        }
      });

    case types.WRITE_POST_SUCCESS:
      return update(state, {
        write: {
          status: {
            $set: "SUCCESS"
          },
          post: {
            $set: action.post
          }
        }
      });

    case types.WRITE_POST_FAILURE:
      return update(state, {
        write: {
          status: {
            $set: "FAILURE"
          }
        }
      });

    default: return state;
  }
}