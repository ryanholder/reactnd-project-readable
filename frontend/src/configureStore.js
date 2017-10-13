import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const configureStore = () => {
  const middleware = [thunk, logger];
  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(...middleware),
    ));

  return store;
};

export default configureStore;
