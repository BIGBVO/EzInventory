import { CREATE_MESSAGE} from '../types';

/*
Create alert message as a result of action.
Can either be success alert or error alers.
*/
export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};


