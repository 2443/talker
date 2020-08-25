import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN } from '../reducers/user';

function delay(time) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(loginDummyData);
    }, time)
  );
}

const loginDummyData = {
  nickname: '지미',
  id: 1,
};

export const login = (parameter) => ({ type: LOGIN, payload: delay(1000) });
