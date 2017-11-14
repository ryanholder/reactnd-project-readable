import { POSTS_URL } from './posts';
import { COMMENTS_URL } from './comments';
import {
  VOTE_POST_SUCCESS,
  VOTE_COMMENT_SUCCESS,
} from './types';

const headers = {
  Authorization: 'authem',
  'Content-Type': 'application/json',
};

export const votePostSuccess = post => ({
  type: VOTE_POST_SUCCESS,
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
    .then(post => dispatch(votePostSuccess(post)));
};

export const votePostDown = postId => (dispatch, getState) => {
  const request = new Request(`${POSTS_URL}/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'downVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(post => dispatch(votePostSuccess(post)));
};

export const voteCommentSuccess = comment => ({
  type: VOTE_COMMENT_SUCCESS,
  comment,
});

export const voteCommentUp = commentId => (dispatch) => {
  const request = new Request(`${COMMENTS_URL}/${commentId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'upVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(comment => dispatch(voteCommentSuccess(comment)));
};

export const voteCommentDown = commentId => (dispatch) => {
  const request = new Request(`${COMMENTS_URL}/${commentId}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'downVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(comment => dispatch(voteCommentSuccess(comment)));
};
