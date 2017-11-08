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

export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';

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

export const editCommentSuccess = comment => ({
  type: EDIT_COMMENT_SUCCESS,
  comment,
  receivedAt: Date.now(),
});

export const editComment = comment => (dispatch) => {
  fetch(`${COMMENTS_URL}/${comment.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
    }),
  })
    .then(response => response.json())
    .then(json => dispatch(editCommentSuccess(json)));
};

export const deleteCommentSuccess = comment => ({
  type: DELETE_COMMENT_SUCCESS,
  comment,
  deletedAt: Date.now(),
});

export const deleteComment = commentId => dispatch =>
  fetch(`${COMMENTS_URL}/${commentId}`, {
    method: 'DELETE',
    headers,
  })
    .then(response => response.json())
    .then(json => dispatch(deleteCommentSuccess(json)));
