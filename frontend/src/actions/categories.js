import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  SET_SELECTED_CATEGORY,
} from './types';

const CATEGORIES_URL = 'http://localhost:3001/categories';

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

export const receiveCategories = json => ({
  type: RECEIVE_CATEGORIES,
  categories: json.categories,
  receivedAt: Date.now(),
});

export const setSelectedCategory = category => ({
  type: SET_SELECTED_CATEGORY,
  category,
});

export const fetchCategories = () => (dispatch) => {
  dispatch(requestCategories());
  return fetch(`${CATEGORIES_URL}`, { headers: { Authorization: 'authem' } })
    .then(response => response.json())
    .then(json => dispatch(receiveCategories(json)));
};
