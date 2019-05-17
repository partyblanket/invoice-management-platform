import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './utils/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import Main from './components/main';
import Header from './components/header';
import Settings from './components/settings';
import Sidebar from './components/sidebar'
// import Template from './components/template'

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(
      reduxPromise
  )
));

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Header />
          <Sidebar />
          <Route exact path='/' component={Main} />
          <Route exact path='/settings' component={Settings} />
          {/* <Route exact path='/template' component={Template} /> */}
          

        </>
      </BrowserRouter>
    </Provider>
  )
}

export default App
