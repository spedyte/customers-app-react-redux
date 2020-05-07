import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import {customers} from './customers';
import { CUSTOMER_LIST, CUSTOMER_EDIT, CUSTOMER_VIEW } from '../constants/permissions';

const user =(state,action) => (
    {
        permissions:[CUSTOMER_LIST,CUSTOMER_VIEW,CUSTOMER_EDIT]
    }
)

export default combineReducers({
    customers,
    form:reduxForm,
    user
});