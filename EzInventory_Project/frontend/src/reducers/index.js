import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import checkout from './checkout';
import invoices from './invoices';
import messages from './alerts/messages';
import errors from './alerts/errors';
import users from "./users";

//Index page to combine all reducers to state
export default combineReducers({
    auth,
    products,
    checkout,
    invoices,
    messages,
    errors,
    users,
});
