import { POSTS_URL } from './posts';
import { COMMENTS_URL } from './comments';

const headers = {
  Authorization: 'authem',
  'Content-Type': 'application/json',
};

export const VOTE_POST_UP_SUCCESS = 'VOTE_POST_UP_SUCCESS';
export const VOTE_POST_DOWN_SUCCESS = 'VOTE_POST_DOWN_SUCCESS';

export const VOTE_COMMENT_UP_SUCCESS = 'VOTE_COMMENT_UP_SUCCESS';
export const VOTE_COMMENT_DOWN_SUCCESS = 'VOTE_COMMENT_DOWN_SUCCESS';

export const votePostUpSuccess = post => ({
  type: VOTE_POST_UP_SUCCESS,
  post,
});

export const votePostDownSuccess = post => ({
  type: VOTE_POST_DOWN_SUCCESS,
  post,
});

export const votePostUp = postId => (dispatch, getState) => {
  const request = new Request(`${POSTS_URL}/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'upVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(post => dispatch(votePostUpSuccess(post)));
};

export const votePostDown = postId => (dispatch, getState) => {
  const request = new Request(`${POSTS_URL}/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'downVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(post => dispatch(votePostDownSuccess(post)));
};

export const voteCommentUpSuccess = comment => ({
  type: VOTE_COMMENT_UP_SUCCESS,
  comment,
});

export const voteCommentDownSuccess = comment => ({
  type: VOTE_COMMENT_DOWN_SUCCESS,
  comment,
});

export const voteCommentUp = commentId => (dispatch, getState) => {
  const state = getState();
  const request = new Request(`${COMMENTS_URL}/${commentId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'upVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(comment => dispatch(voteCommentUpSuccess(comment)));
    // .then(() => dispatch(orderComments(state.comments.orderDesc, state.comments.orderBy)));
};

export const voteCommentDown = commentId => (dispatch, getState) => {
  const state = getState();
  const request = new Request(`${COMMENTS_URL}/${commentId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'downVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(comment => dispatch(voteCommentDownSuccess(comment)));
    // .then(() => dispatch(orderComments(state.comments.orderDesc, state.comments.orderBy)));
};
