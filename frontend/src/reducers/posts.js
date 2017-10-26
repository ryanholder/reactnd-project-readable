import {
  REQUEST_POSTS, RECEIVE_POSTS, ORDER_POSTS,
} from '../actions/posts';

import {
  VOTE_POST_UP_SUCCESS, VOTE_POST_DOWN_SUCCESS,
} from '../actions/votes';

const handleRequestOrderPosts = (state, orderBy) => {
  let order = 'desc';
  if (state.orderBy === orderBy && state.order === 'desc') {
    order = 'asc';
  }
  order === 'desc'
    ? state.items.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : state.items.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
  return {
    ...state,
    order,
    orderBy,
  };
};

const posts = (state = {
  isFetching: false,
  items: [],
  order: 'desc',
  orderBy: 'voteScore',
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      };
    case ORDER_POSTS:
      return handleRequestOrderPosts(state, action.orderBy);
    case VOTE_POST_UP_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            if (item.id === action.post.id) {
              return { ...item, voteScore: action.post.voteScore };
            }
            return item;
          }),
        ],
      };
    case VOTE_POST_DOWN_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            if (item.id === action.post.id) {
              return { ...item, voteScore: action.post.voteScore };
            }
            return item;
          }),
        ],
      };
    default:
      return state;
  }
};

export default posts;
