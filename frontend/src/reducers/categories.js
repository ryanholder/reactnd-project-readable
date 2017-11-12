import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  SET_SELECTED_CATEGORY,
} from '../actions/categories';

const categories = (state = {
  isFetching: false,
  selectedCategory: 'all',
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
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category,
      };
    default:
      return state;
  }
};

export default categories;
