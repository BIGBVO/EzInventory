import axios from 'axios';
import { getErrors } from './alerts/error'
import { createMessage }from './alerts/message'

import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  REQUEST_CHANGE_PASSWORD,
  PASSWORD_CHANGED,
  CHANGE_PASSWORD_FAILED
} from './types';

//Perform API call for login to backend
export const login = (username, password) => (dispatch) => {
  
  // configuration needed for sending JSON when making API call to backend
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });

  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispatch(createMessage({ loginSuccess: 'Login Successfully' }));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(getErrors(err.response.data));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//Load A specific user from backend
export const loadUser = () => (dispatch, getState) => {
    /** Loading user. Used to set the isLoading state to true as we need to wait for database opertions to finsih */
    dispatch({ type: USER_LOADING });
  
    axios
      .get('/api/auth/user', tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_ERROR,
          error: err,
        });
      });
};

/*
Logout from the system.
Set redux state to clear the knox token in the system
*/
export const logout = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ logoutSuccess: 'Logged Out Successfully' }));
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {

    });
};


// Update User Password
export const changePassword = (user) => (dispatch, getState) => {
  dispatch({ type : REQUEST_CHANGE_PASSWORD});
  axios
    .post('/api/auth/change_password',user, tokenConfig(getState))
    .then((res) => {
      if (res.data.message == "No user found"){
        dispatch(createMessage({ changePasswordFail: 'Old Password Wrong'}));
        dispatch({
          type: CHANGE_PASSWORD_FAILED
        })
      } else {
        dispatch(createMessage({ changePassword: 'Password updated successfully' }));
        dispatch({
          type: PASSWORD_CHANGED,
          payload: res.data,
        });
      }
    })
    .catch((err) => dispatch(getErrors(err.response.data, err.response.status)));
};

/*
Return the configuration needed to perform API calls that need authentication.
This function also set the configuration needed to send JSON File.
*/
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
