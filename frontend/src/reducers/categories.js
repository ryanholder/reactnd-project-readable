import {
  SET_SELECTED_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from '../actions/categories';

const categories = (state = {
  selectedCategory: 'all',
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category,
      };
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

export default categories;
