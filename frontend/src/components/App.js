import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostView from './PostView';
import PostDetailView from './PostDetailView';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:category?" component={PostView} />
      <Route exact path="/:category/:id" component={PostDetailView} />
    </Switch>
  </BrowserRouter>
);

export default App;
