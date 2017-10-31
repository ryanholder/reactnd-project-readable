export const COMMENTS_URL = 'http://localhost:3001/comments/';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ORDER_COMMENTS = 'ORDER_COMMENTS';

export const requestComments = () => ({
  type: REQUEST_COMMENTS,
});

export const receiveComments = (postId, comments) => ({
  type: RECEIVE_COMMENTS,
  postId,
  comments,
  receivedAt: Date.now(),
});

export const orderComments = (orderDesc, orderBy) => ({
  type: ORDER_COMMENTS,
  orderDesc,
  orderBy,
});

export const fetchComments = postId => (dispatch) => {
  dispatch(requestComments());
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/posts/${postId}/comments`, { headers: { Authorization: 'authem' } })
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
