import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import CategorySelect from './CategorySelect';
import AddPost from './AddPost';

const PostsViewNavigation = (props) => {
  const { categories } = props;
  return (
    <AppBar position="static" color="primary">
      <Toolbar className="nav-toolbar">
        <CategorySelect
          categories={categories}
        />
        <div className="flex-grow" />
        <AddPost />
      </Toolbar>
    </AppBar>
  );
};

PostsViewNavigation.propTypes = {
  categories: PropTypes.shape({
    selectedCategory: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
};

export default PostsViewNavigation;
