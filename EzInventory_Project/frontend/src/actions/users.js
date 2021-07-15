import axios from 'axios';
import { getErrors } from './alerts/error'
import { createMessage }from './alerts/message'
import { tokenConfig } from './auth';

import { CREATE_USER, NEW_USER_ADDED, FETCH_USER,USER_FETECHED, REQUEST_ALL_USERS, LIST_ALL_USERS,
         REQUEST_USER_UPDATE, USER_UPDATE, REQUEST_DELETE_USER, USER_DELETED } from './types';

// add new user to the database
export const createUser = (user) => (dispatch, getState) => {
  console.log(user);
  dispatch({ type: CREATE_USER});
  axios
    .post('/api/user/create', user, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addUser: 'User successfully added to the system' }));
      dispatch({
        type: NEW_USER_ADDED,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getErrors(err.response.data, err.response.status)));
};

// get the list of all accounts
export const getAllUsers = () => (dispatch, getState) => {
    console.log("\n\n\n get all users is called");
  dispatch({ type: REQUEST_ALL_USERS });
  axios
    .get('/api/user/all_users', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LIST_ALL_USERS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getErrors(err.response.data, err.response.status)));
};

// a superuser can delete an account of another user
export const deleteAccount = (username) => (dispatch, getState) => {
    dispatch({ type: REQUEST_DELETE_USER });

    const token = getState().auth.token;

    axios.delete('/api/user/delete', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      data: {
        'username': username
      }
    }).then((res) => {
        dispatch(createMessage({ deleteUser: 'Account successfully deleted' }));
        dispatch({
          type: USER_DELETED,
          payload: username,
        });
      })
      .catch((err) => dispatch(getErrors(err.response.data, err.response.status)));
};