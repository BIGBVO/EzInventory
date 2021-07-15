import { GET_ERRORS } from '../types';

// Getting the error from action
export const getErrors = (msg) => {
    return {
      type: GET_ERRORS,
      payload: msg,
    };
  };