const ROOT_URL = 'http://localhost:3001';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category,
});

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

export const receiveCategories = category => ({
  type: RECEIVE_CATEGORIES,
  categories: category.data.children.map(child => child.data),
  receivedAt: Date.now(),
});

const fetchCategories = category => (dispatch) => {
  dispatch(requestCategories(category));
  return fetch(`${ROOT_URL}/categories`)
    .then(response => response.json())
    .then(json => dispatch(receiveCategories(category, json)));
};

const shouldFetchCategories = (state, category) => {
  const categories = state.postsByCategories[category];
  if (!categories) {
    return true;
  }
  if (categories.isFetching) {
    return false;
  }
  return categories.didInvalidate;
};

export const fetchCategoriesIfNeeded = category => (dispatch, getState) => {
  console.log(dispatch);
  if (shouldFetchCategories(getState(), category)) {
    return dispatch(fetchCategories(category));
  }

  return category.didInvalidate;
};
