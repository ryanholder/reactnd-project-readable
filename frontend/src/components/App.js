import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostView from './PostView';
import PostDetailView from './PostDetailView';


const App = ({ match }) => (
  <Router>
    <Route path="/:category?" component={PostView} />
  </Router>
);

const mapStateToProps = (state) => {
  const { categories, posts } = state;
  return {
    categories,
    posts,
  };
};

App.propTypes = {
  match: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
