import { createDummyUser } from '../actions/user';
export const initialState = {
  // me: createDummyUser(),
  me: null,
  Users: [],
  filteredUsers: [],
  // 공용
  loading: false,
  done: false,
  error: null,
  //
  signupDone: false,
};

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const FILTER_USERS = 'FILTER_USERS';
export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';

export const LOAD_MY_DATA = 'LOAD_MY_DATA';
export const LOAD_MY_DATA_REQUEST = 'LOAD_MY_DATA_REQUEST';
export const LOAD_MY_DATA_SUCCESS = 'LOAD_MY_DATA_SUCCESS';
export const LOAD_MY_DATA_FAILURE = 'LOAD_MY_DATA_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MY_DATA_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_MY_DATA_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        me: action.payload.data,
        loading: false,
        done: true,
      };
    case LOAD_MY_DATA_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        me: null,
        loading: false,
        error: action.payload,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupDone: true,
        loading: false,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        me: null,
        loading: false,
        error: action.payload,
      };
    case LOAD_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        Users: action.payload.sort((a, b) => {
          if (a.nickname < b.nickname) {
            return -1;
          }
          if (a.nickname > b.nickname) {
            return 1;
          }
        }),
        loading: false,
        signupDone: true,
      };
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FILTER_USERS:
      const keyword = action.payload.toLowerCase().trim();
      return {
        ...state,
        filteredUsers: state.Users.filter((user) => user.nickname.toLowerCase().includes(keyword)),
      };
    default:
      return state;
  }
};

export default reducer;
