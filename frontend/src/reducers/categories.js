import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from '../actions/categories';

const categories = (state = {
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

export default categories;
