import {createStore,composer, compose} from 'redux';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = state => state;

export const store = createStore(reducers,{},composeEnhacers());