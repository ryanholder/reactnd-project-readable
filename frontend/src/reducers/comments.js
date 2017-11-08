import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  ORDER_COMMENTS,
  ADD_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
} from '../actions/comments';

import {
  VOTE_COMMENT_SUCCESS,
} from '../actions/votes';

const handleRequestOrderComments = (
  state,
  orderDesc = state.orderDesc,
  orderBy = state.orderBy,
  parentId,
) => {
  orderDesc
    ? state.items[parentId].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : state.items[parentId].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
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
      return handleRequestOrderComments(state, action.orderDesc, action.orderBy, action.parentId);
    case ADD_COMMENT_SUCCESS: {
      const parentId = action.comment.parentId;
      return {
        ...state,
        items: {
          [parentId]: [
            ...state.items[parentId],
            action.comment,
          ],
        },
        lastUpdated: action.receivedAt,
      };
    }
    case EDIT_COMMENT_SUCCESS: {
      const parentId = action.comment.parentId;
      return {
        ...state,
        items: {
          ...state.items,
          [parentId]: [
            ...state.items[parentId].map((item) => {
              if (item.id === action.comment.id) {
                return {
                  ...item,
                  body: action.comment.body,
                  author: action.comment.author,
                  timestamp: action.comment.timestamp,
                };
              }
              return item;
            }),
          ],
        },
      };
    }
    case VOTE_COMMENT_SUCCESS: {
      const parentId = action.comment.parentId;
      return {
        ...state,
        items: {
          [parentId]: [
            ...state.items[parentId].map((item) => {
              if (item.id === action.comment.id) {
                return { ...item, voteScore: action.comment.voteScore };
              }
              return item;
            }),
          ],
        },
      };
    }
    default:
      return state;
  }
};

export default comments;
