import { CREATE_USER, NEW_USER_ADDED , REQUEST_ALL_USERS, LIST_ALL_USERS,
         REQUEST_DELETE_USER, USER_DELETED } from '../actions/types.js';


//user reducers
const initialState = {
  user_list: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case CREATE_USER:
    case REQUEST_DELETE_USER:
      return {
        ...state,
        user_list: [],
        isLoading: true
      }

    case NEW_USER_ADDED:
      return {
        ...state,
        user_list: [state.user_list, action.payload],
        isLoading: false,
      };
    case REQUEST_ALL_USERS:
      return {
        ...state,
        user_list: [],
        isLoading: true,
    };
    case LIST_ALL_USERS:
       return {
        ...state,
        user_list: action.payload,
        isLoading: false,
      };

    case USER_DELETED:
      return {
        ...state,
        user_list: state.user_list.filter((user) => user.username !== action.payload),
        isLoading:false,
      };
    default:
      return state;
  }
}
