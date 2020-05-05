import {createStore,compose,applyMiddleware} from 'redux';
import promiseMidleware from 'redux-promise';

import reducers from './../reducers';


const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers,{},
    composeEnhacers(applyMiddleware(promiseMidleware)));