import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import PostsList from '../components/PostsList';

const App = props => (
  <div className="App">
    <Navigation />
    <PostsList />
  </div>
);

const mapStateToProps = (state) => {
  const { selectedCategory, posts } = state;
  return {
    selectedCategory,
    posts,
  };
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  }).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(App);
