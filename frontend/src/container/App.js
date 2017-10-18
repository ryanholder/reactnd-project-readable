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
    {/* <Route path={category === 'all' ? '/' : `/:${category}`} component={App} /> */}

    <Switch>
      <Route exact path={props.categories.selectedCategory === 'all' ? '/' : `/:${props.categories.selectedCategory}`} component={PostsList} />
      <Route exact path="/:category/:id" component={PostView} />
    </Switch>
  </div>
);

const mapStateToProps = (state) => {
  const { categories, posts } = state;
  return {
    categories,
    posts,
  };
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  }).isRequired,
  categories: PropTypes.shape({
    selectedCategory: PropTypes.string,
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  }).isRequired,
};

export default connect(mapStateToProps)(App);
