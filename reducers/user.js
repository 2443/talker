import { createDummyUser } from '../actions/user';
export const initialState = {
  // me: createDummyUser(),
  me: null,
  Users: [],
  searchedUser: null,
  filteredUsers: [],
  // 공용
  loading: false,
  done: false,
  error: null,
  //

  signupDone: false,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
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

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_MY_DATA = 'LOAD_MY_DATA';
export const LOAD_MY_DATA_REQUEST = 'LOAD_MY_DATA_REQUEST';
export const LOAD_MY_DATA_SUCCESS = 'LOAD_MY_DATA_SUCCESS';
export const LOAD_MY_DATA_FAILURE = 'LOAD_MY_DATA_FAILURE';

export const REQUEST_ADD_FRIEND = 'REQUEST_ADD_FRIEND';
export const REQUEST_ADD_FRIEND_REQUEST = 'REQUEST_ADD_FRIEND_REQUEST';
export const REQUEST_ADD_FRIEND_SUCCESS = 'REQUEST_ADD_FRIEND_SUCCESS';
export const REQUEST_ADD_FRIEND_FAILURE = 'REQUEST_ADD_FRIEND_FAILURE';

export const RESPONSE_ADD_FRIEND = 'RESPONSE_ADD_FRIEND';
export const RESPONSE_ADD_FRIEND_REQUEST = 'RESPONSE_ADD_FRIEND_REQUEST';
export const RESPONSE_ADD_FRIEND_SUCCESS = 'RESPONSE_ADD_FRIEND_SUCCESS';
export const RESPONSE_ADD_FRIEND_FAILURE = 'RESPONSE_ADD_FRIEND_FAILURE';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const UPLOAD_USER_IMAGE = 'UPLOAD_USER_IMAGE';
export const UPLOAD_USER_IMAGE_REQUEST = 'UPLOAD_USER_IMAGE_REQUEST';
export const UPLOAD_USER_IMAGE_SUCCESS = 'UPLOAD_USER_IMAGE_SUCCESS';
export const UPLOAD_USER_IMAGE_FAILURE = 'UPLOAD_USER_IMAGE_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

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
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loadUserLoading: true,
        loadUserDone: false,
        loadUserError: null,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        Users: action.payload.data,
        loadUserLoading: false,
        loadUserDone: true,
      };
    case LOAD_USER_SUCCESS:
      const searchedUser = action.payload.data;
      return {
        ...state,
        searchedUser: state.Users.find((e) => e.id === searchedUser.id) ? null : searchedUser,
        loadUserLoading: false,
        loadUserError: null,
      };
    case LOAD_USERS_FAILURE:
    case LOAD_USER_FAILURE:
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
    case REQUEST_ADD_FRIEND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_ADD_FRIEND_SUCCESS:
      return {
        ...state,
        Users: state.Users.concat({ ...state.searchedUser, state: 'send' }),
        searchedUser: null,
        loading: false,
      };
    case REQUEST_ADD_FRIEND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESPONSE_ADD_FRIEND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESPONSE_ADD_FRIEND_SUCCESS: {
      const { id, state: responseState } = action.payload.data;
      const idToNumber = parseInt(id, 10);

      if (responseState === 'reject') {
        return {
          ...state,
          Users: state.Users.filter((user) => user.id !== idToNumber),
          searchedUser: null,
          loading: false,
        };
      }

      const newUsers = state.Users.map((user) => {
        if (user.id !== idToNumber) {
          return user;
        }
        return { ...user, state: responseState === 'block' ? responseState : 'friend' };
      });

      return {
        ...state,
        Users: newUsers,
        searchedUser: null,
        loading: false,
      };
    }
    case RESPONSE_ADD_FRIEND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        me: { ...state.me, ...action.payload.data },
        loading: false,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPLOAD_USER_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_USER_IMAGE_SUCCESS:
      return {
        ...state,
        me: { ...state.me, profileImage: action.payload.data },
        loading: false,
      };
    case UPLOAD_USER_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_IMAGE:
      return {
        ...state,
        me: { ...state.me, profileImage: null },
      };
    default:
      return state;
  }
};

export default reducer;
