const POSTS_URL = 'http://localhost:3001/posts';
const CATEGORY_POSTS_URL = 'http://localhost:3001/category/posts';

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

const logme = (log) => {
  console.log(log);
  return log;
};

export const fetchPosts = category => (dispatch) => {
  dispatch(requestPosts());
  return fetch((category === 'all' ? `${POSTS_URL}` : `${CATEGORY_POSTS_URL}`), { headers: { Authorization: 'authem' } })
    .then(response => response.json())
    .then(log => logme(log))
    .then(json => dispatch(receivePosts(json)));
};
