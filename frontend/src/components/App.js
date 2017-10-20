import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import PostsList from './PostsList';
import PostView from '../components/PostView';

const App = ({ match }) => (
  <div className="App">
    <Navigation
      category={match.params.category || 'all'}
    />
    <PostsList
      category={match.params.category || 'all'}
    />
  </div>
);

const mapStateToProps = (state) => {
  const { categories, posts } = state;
  return {
    categories,
    posts,
  };
};

export default connect(mapStateToProps)(App);
