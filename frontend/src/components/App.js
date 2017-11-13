import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostsView from './PostsView';
import PostDetailView from './PostDetailView';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:category?" component={PostsView} />
      <Route exact path="/:category/:id" component={PostDetailView} />
    </Switch>
  </BrowserRouter>
);

export default App;
