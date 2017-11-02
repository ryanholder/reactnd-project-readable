import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import CategorySelect from './CategorySelect';
import AddPost from './AddPost';

const PostViewNavigation = (props) => {
  const { category } = props;
  return (
    <AppBar position="static" color="primary">
      <Toolbar className="nav-toolbar">
        <CategorySelect category={category} />
        <div className="appTitle" />
        <AddPost />
      </Toolbar>
    </AppBar>
  );
};

PostViewNavigation.propTypes = {
  category: PropTypes.string.isRequired,
};

export default PostViewNavigation;
