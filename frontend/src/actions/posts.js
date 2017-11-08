import { v1 } from 'uuid';
import { fetchComments } from './comments';

const headers = {
  Authorization: 'authem',
  'Content-Type': 'application/json',
};

export const POSTS_URL = 'http://localhost:3001/posts';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const ORDER_POSTS = 'ORDER_POSTS';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';

export const requestPosts = () => ({
  type: REQUEST_POSTS,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
  receivedAt: Date.now(),
});

export const orderPosts = (orderDesc, orderBy) => ({
  type: ORDER_POSTS,
  orderDesc,
  orderBy,
});

export const fetchPosts = () => (dispatch, getState) => {
  const state = getState();
  dispatch(requestPosts());
  return fetch(`${POSTS_URL}`, { headers })
    .then(response => response.json())
    .then((posts) => {
      dispatch(receivePosts(posts));
      posts.forEach(post => dispatch(fetchComments(post.id)));
    })
    .then(posts => dispatch(orderPosts(state.posts.orderDesc, state.posts.orderBy)));
};

export const addPostSuccess = post => ({
  type: ADD_POST_SUCCESS,
  post,
  receivedAt: Date.now(),
});

export const addPostFailure = () => ({
  type: ADD_POST_FAILURE,
});

export const addNewPost = post => (dispatch, getState) => {
  const state = getState();
  return fetch(`${POSTS_URL}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id: v1(),
      timestamp: Date.now(),
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
    }),
  })
    .then(response => response.json())
    .then(data => dispatch(addPostSuccess(data)))
    .then(data => data.post.id)
    .then(postId => dispatch(fetchComments(postId)))
    .then(() => dispatch(orderPosts(state.posts.orderDesc, state.posts.orderBy)));
};

export const editPostSuccess = post => ({
  type: EDIT_POST_SUCCESS,
  post,
  receivedAt: Date.now(),
});

export const editPost = post => dispatch =>
  fetch(`${POSTS_URL}/${post.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
    }),
  })
    .then(response => response.json())
    .then(json => dispatch(editPostSuccess(json)));

export const deletePostSuccess = post => ({
  type: DELETE_POST_SUCCESS,
  post,
  deletedAt: Date.now(),
});

export const deletePost = postId => dispatch =>
  fetch(`${POSTS_URL}/${postId}`, {
    method: 'DELETE',
    headers,
  })
    .then(response => response.json())
    .then(json => dispatch(deletePostSuccess(json)));
