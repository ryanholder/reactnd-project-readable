const POSTS_URL = 'http://localhost:3001/posts';
const headers = {
  Authorization: 'authem',
  'Content-Type': 'application/json',
};

export const VOTE_POST_UP = 'VOTE_POST_UP';
export const VOTE_POST_UP_SUCCESS = 'VOTE_POST_UP_SUCCESS';
export const VOTE_POST_DOWN_SUCCESS = 'VOTE_POST_DOWN_SUCCESS';

export const votePostUpSuccess = json => ({
  type: VOTE_POST_UP_SUCCESS,
  post: json,
});

export const votePostDownSuccess = json => ({
  type: VOTE_POST_DOWN_SUCCESS,
  post: json,
});

export const votePostUp = id => (dispatch) => {
  const request = new Request(`${POSTS_URL}/${id}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'upVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(json => dispatch(votePostUpSuccess(json)));
    // .then((response) => {
      // console.log('response', response);
      // switch (action.type) {
      // .then(json => dispatch(votePostUp(json)));
    // });
};

export const votePostDown = id => (dispatch) => {
  const request = new Request(`${POSTS_URL}/${id}`, {
    method: 'POST',
    body: JSON.stringify({ option: 'downVote' }),
    headers,
  });

  return fetch(request)
    .then(response => response.json())
    .then(json => dispatch(votePostDownSuccess(json)));
};
