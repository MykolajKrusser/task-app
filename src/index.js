import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import data from './store/reducers/data';
import auth from './store/reducers/auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers({
  data: data,
  auth: auth
})

const stateStore = createStore(rootReducers, composeEnhancers(
  applyMiddleware(thunk)
));


const app = (
  <Provider store={stateStore}>
    <App />
  </Provider>
);


ReactDOM.render(app, document.getElementById('root'));