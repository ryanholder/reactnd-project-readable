import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ORDER_POSTS,
  ADD_POST_SUCCESS,
  EDIT_POST_SUCCESS,
} from '../actions/posts';

import {
  VOTE_POST_SUCCESS,
} from '../actions/votes';

const handleRequestOrderPosts = (
  state,
  orderDesc = state.orderDesc,
  orderBy = state.orderBy,
) => {
  orderDesc
    ? state.items.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : state.items.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
  return {
    ...state,
    orderDesc,
    orderBy,
  };
};

const posts = (state = {
  isFetching: false,
  items: [],
  orderDesc: true,
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
      return handleRequestOrderPosts(state, action.orderDesc, action.orderBy);
    case ADD_POST_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.post],
        lastUpdated: action.receivedAt,
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            if (item.id === action.post.id) {
              return {
                ...item,
                title: action.post.title,
                body: action.post.body,
                author: action.post.author,
                category: action.post.category,
              };
            }
            return item;
          }),
        ],
      };
      // return state.items.map((item) => {
      //   if (item.id === action.post.id) {
      //     return {
      //       ...item,
      //       title: action.post.title,
      //       body: action.post.body,
      //       author: action.post.author,
      //       category: action.post.category,
      //     };
      //   }
      // });
      // return {
      //   ...state,
      //   items: [...state.items, action.post],
      //   lastUpdated: action.receivedAt,
      // };
    case VOTE_POST_SUCCESS:
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
