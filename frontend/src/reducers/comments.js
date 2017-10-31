import {
  REQUEST_COMMENTS, RECEIVE_COMMENTS, ORDER_COMMENTS,
} from '../actions/comments';

import {
  VOTE_COMMENT_UP_SUCCESS, VOTE_COMMENT_DOWN_SUCCESS,
} from '../actions/votes';

const handleRequestOrderComments = (state, orderDesc = state.orderDesc, orderBy = state.orderBy) => {
  orderDesc
    ? state.items.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : state.items.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
  return {
    ...state,
    orderDesc,
    orderBy,
  };
};

const comments = (state = {
  isFetching: false,
  items: {},
  orderDesc: true,
  orderBy: 'voteScore',
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
        items: {
          ...state.items,
          [action.postId]: action.comments,
        },
        isFetching: false,
        lastUpdated: action.receivedAt,
      };
    case ORDER_COMMENTS:
      return handleRequestOrderComments(state, action.orderDesc, action.orderBy);
    case VOTE_COMMENT_UP_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            if (item.id === action.comment.id) {
              return { ...item, voteScore: action.comment.voteScore };
            }
            return item;
          }),
        ],
      };
    case VOTE_COMMENT_DOWN_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            if (item.id === action.comment.id) {
              return { ...item, voteScore: action.comment.voteScore };
            }
            return item;
          }),
        ],
      };
    default:
      return state;
  }
};

export default comments;
