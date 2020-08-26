import { createDummyUser } from '../actions/user';
export const initialState = {
  me: createDummyUser(),
  Users: [],
  filteredUsers: [],
  // 공용
  loading: false,
  done: false,
  error: null,
  //
  signUpDone: false,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        me: action.payload,
        loading: false,
        done: true,
      };
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
        loading: false,
        signupDone: true,
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
