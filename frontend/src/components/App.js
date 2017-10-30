import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostView from './PostView';
import PostDetailView from './PostDetailView';


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/:category?" component={PostView} />
      <Route exact path="/:category/:id" component={PostDetailView} />
    </Switch>
  </Router>
);

const mapStateToProps = (state) => {
  const { categories, posts } = state;
  return {
    categories,
    posts,
  };
};

export default connect(mapStateToProps)(App);
