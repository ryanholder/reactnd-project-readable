import { fetchComments } from './comments';

export const POSTS_URL = 'http://localhost:3001/posts';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ORDER_POSTS = 'ORDER_POSTS';


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
  return fetch(`${POSTS_URL}`, { headers: { Authorization: 'authem' } })
    .then(response => response.json())
    .then((posts) => {
      dispatch(receivePosts(posts));
      posts.forEach(post => dispatch(fetchComments(post.id)));
    })
    .then(posts => dispatch(orderPosts(state.posts.orderDesc, state.posts.orderBy)));
};
