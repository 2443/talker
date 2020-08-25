export const initialState = {};

export const LOGIN = 'LOGIN';

export const login = (data) => ({
  type: LOGIN,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
