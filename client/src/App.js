import React from 'react';
// import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './utils/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import Main from './components/main';
import Header from './components/header';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(
      reduxPromise
  )
));

function App () {
  return (
    <Provider store={store}>
        <Header />
        <Main />
      </Provider>
  )
}

export default App
