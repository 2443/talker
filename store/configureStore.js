import { applyMiddleware, createStore, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware';
import reducer from '../reducers';

const logger = createLogger();
const customizedPromiseMiddleware = createPromise({
  promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
});
const configureStore = () => {
  const middlewares = [logger, ReduxThunk, customizedPromiseMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
