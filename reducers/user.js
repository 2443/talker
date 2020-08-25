export const initialState = {
  me: null,
  // 공용
  loading: false,
  done: false,
  error: null,
  //
};

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
    default:
      return state;
  }
};

export default reducer;
