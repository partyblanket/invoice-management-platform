import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './utils/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import Main from './components/main';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(
      reduxPromise
  )
));

function App () {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
};

export default App
