const POSTS_URL = 'http://localhost:3001/posts';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const requestPosts = () => ({
  type: REQUEST_POSTS,
});

export const receivePosts = json => ({
  type: RECEIVE_POSTS,
  posts: json,
  receivedAt: Date.now(),
});

export const fetchPosts = () => (dispatch) => {
  dispatch(requestPosts());
  return fetch(`${POSTS_URL}`, { headers: { Authorization: 'authem' } })
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)));
};
