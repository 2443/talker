import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN, SIGNUP } from '../reducers/user';

function delay(time, data = null) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );
}

const loginDummyData = {
  nickname: '지미',
  id: 1,
};

export const login = (parameter) => ({ type: LOGIN, payload: delay(1000, loginDummyData) });
export const signup = (parameter) => ({ type: SIGNUP, payload: delay(1000, loginDummyData) });
