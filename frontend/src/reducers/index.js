import { combineReducers } from 'redux';

import posts from './posts';
import comments from './comments';
import { categories, selectedCategory } from './categories';

export default combineReducers({
  posts,
  comments,
  categories,
  selectedCategory,
});
