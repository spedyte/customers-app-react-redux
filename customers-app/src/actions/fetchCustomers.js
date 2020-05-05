import {createAction} from 'redux-actions';

import {FETCH_CUSTOMERS} from './../constants';


export const fetchCustomers = createAction(FETCH_CUSTOMERS);