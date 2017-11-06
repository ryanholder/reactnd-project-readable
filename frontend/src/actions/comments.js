import { v1 } from 'uuid';

const headers = {
  Authorization: 'authem',
  'Content-Type': 'application/json',
};

export const COMMENTS_URL = 'http://localhost:3001/comments';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const ORDER_COMMENTS = 'ORDER_COMMENTS';

export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const requestComments = () => ({
  type: REQUEST_COMMENTS,
});

export const receiveComments = (postId, comments) => ({
  type: RECEIVE_COMMENTS,
  postId,
  comments,
  receivedAt: Date.now(),
});

export const orderComments = (orderDesc, orderBy, parentId) => ({
  type: ORDER_COMMENTS,
  orderDesc,
  orderBy,
  parentId,
});

export const fetchComments = postId => (dispatch) => {
  dispatch(requestComments());
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/posts/${postId}/comments`, { headers })
      .then(data => data.json())
      .then((jsonData) => {
        resolve({ [postId]: jsonData });
      })
      .catch(error => reject(error));
  })
    .then((result) => {
      dispatch(receiveComments(postId, result[postId]));
    }).catch((error) => {
      throw (error);
    });
};

export const addCommentSuccess = comment => ({
  type: ADD_COMMENT_SUCCESS,
  comment,
  receivedAt: Date.now(),
});

export const addCommentFailure = () => ({
  type: ADD_COMMENT_FAILURE,
});

export const addNewComment = comment => dispatch =>
  fetch(`${COMMENTS_URL}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id: v1(),
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
      parentId: comment.parenId,
    }),
  })
    .then(response => response.json())
    .then(json => dispatch(addCommentSuccess(json)));
