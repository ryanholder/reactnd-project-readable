import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import PostsList from '../components/PostsList';
import PostView from '../components/PostView';

const App = props => (
  <div className="App">
    <Navigation />
    <Switch>
      <Route exact path="/:{props.selectedCategory}" component={PostsList} />
      <Route exact path="/:category/:id" component={PostView} />
    </Switch>
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
