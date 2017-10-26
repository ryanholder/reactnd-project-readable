import {
  REQUEST_POSTS, RECEIVE_POSTS,
} from '../actions/posts';

import {
  VOTE_POST_UP_SUCCESS, VOTE_POST_DOWN_SUCCESS,
} from '../actions/votes';

const posts = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_POSTS:
      // export const indexById = arr => arr.reduce((obj, item) => {
      //   obj[item.id] = item
      //   return obj
      // }, {})
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      };
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
      // return state.items.map((item) => {
      //   console.log(item);
      //   if (item.id === action.post.id) {
      //     console.log('yes');
      //     console.log(action.post.voteScore);
      //     return { ...item, voteScore: action.post.voteScore };
      //   }
      //   return item;
      // });
    default:
      return state;
  }
};

export default posts;
