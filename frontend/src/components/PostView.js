import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import PostsList from './PostsList';

const PostView = ({ match }) => (
  <div className="App">
    <Navigation
      category={match.params.category || 'all'}
    />
    <PostsList
      category={match.params.category || 'all'}
    />
  </div>
);

PostView.propTypes = {
  match: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { categories, posts } = state;
  return {
    categories,
    posts,
  };
};

export default connect(mapStateToProps)(PostView);
