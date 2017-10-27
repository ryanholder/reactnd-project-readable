import { orderPosts } from './posts';

const POSTS_URL = 'http://localhost:3001/posts';
const headers = {
  Authorization: 'authem',
  'Content-Type': 'application/json',
};

export const VOTE_POST_UP = 'VOTE_POST_UP';
export const VOTE_POST_UP_SUCCESS = 'VOTE_POST_UP_SUCCESS';
export const VOTE_POST_DOWN_SUCCESS = 'VOTE_POST_DOWN_SUCCESS';

export const votePostUpSuccess = json => ({
  type: VOTE_POST_UP_SUCCESS,
  post: json,
});

export const votePostDownSuccess = json => ({
  type: VOTE_POST_DOWN_SUCCESS,
  post: json,
});

export const votePostUp = postId => (dispatch, getState) => {
  const state = getState();
  const request = new Request(`${POSTS_URL}/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'upVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(post => dispatch(votePostUpSuccess(post)))
    .then(() => dispatch(orderPosts(state.posts.orderDesc, state.posts.orderBy)));
};

export const votePostDown = postId => (dispatch, getState) => {
  const state = getState();
  const request = new Request(`${POSTS_URL}/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'downVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(post => dispatch(votePostDownSuccess(post)))
    .then(() => dispatch(orderPosts(state.posts.orderDesc, state.posts.orderBy)));
};
