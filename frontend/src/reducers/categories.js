import {
  SELECT_CATEGORY,
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES,
} from '../actions/categories';

export const selectedCategory = (state = 'all', action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

export const categories = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        isFetching: false,
        items: action.categories,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};
