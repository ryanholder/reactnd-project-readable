import {
  REQUEST_COMMENTS, RECEIVE_COMMENTS,
} from '../actions/comments';

const comments = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        isFetching: false,
        items: action.comments,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

export default comments;
