export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const requestComments = () => ({
  type: REQUEST_COMMENTS,
});

export const receiveComments = comment => ({
  type: RECEIVE_COMMENTS,
  comments: comment.data.children.map(child => child.data),
  receivedAt: Date.now(),
});
