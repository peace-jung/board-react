import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  getCards: {
    status: "INIT",
    cards: []
  },
  selectedPost: {
    status: "INIT",
    post: {}
  }
};

export default function card(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    /* Get All Posts */
    case types.GET_CARDS:
      return update(state, {
        getCards: {
          status: {
            $set: "WAIT"
          }
        }
      });

    case types.GET_CARDS_SUCCESS:
      return update(state, {
        getCards: {
          status: {
            $set: "SUCCESS"
          },
          cards: {
            $set: action.posts
          }
        }
      });

    case types.GET_CARDS_FAILURE:
      return update(state, {
        getCards: {
          status: {
            $set: "FAILURE"
          }
        }
      });
      
    /* Get Selected Post */
    case types.GET_SELECTED_POST:
      return update(state, {
        selectedPost: {
          status: {
            $set: "WAIT"
          }
        }
      });
    case types.GET_SELECTED_POST_SUCCESS:
      return update(state, {
        selectedPost: {
          status: {
            $set: "SUCCESS"
          },
          post: {
            $set: action.post
          }
        }
      });
    case types.GET_SELECTED_POST_FAILURE:
      return update(state, {
        selectedPost: {
          status: {
            $set: "FAILURE"
          }
        }
      });

    default:
      return state;

  }
}