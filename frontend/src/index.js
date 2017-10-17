import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import App from './container/App';
import './index.css';

const store = configureStore();
const category = store.getState().selectedCategory;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path={category === 'all' ? '/' : `/:${category}`} component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
