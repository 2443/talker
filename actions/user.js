import { LOGIN, SIGNUP, LOAD_USERS, FILTER_USERS, LOAD_MY_DATA } from '../reducers/user';
import faker from 'faker';
import shortId from 'shortid';
import axios from 'axios';
// axios.defaults.baseURL = '';

function delay(time, data = null) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );
}

export const createDummyUser = () => ({
  id: shortId.generate(),
  nickname: faker.name.findName(),
  profileImage: faker.image.avatar(),
  statusMessage: faker.lorem.sentence(),
});
const usersDummyData = Array(10)
  .fill()
  .map(() => createDummyUser());

const signupAPI = (data) => {
  try {
    return axios.post('/user', data);
  } catch (error) {
    return null;
  }
};

const loginAPI = (data) => {
  try {
    return axios.post('http://localhost:4000/login', data);
  } catch (error) {
    return null;
  }
};

const loadMyDataAPI = (data) => {
  try {
    return axios.get('http://localhost:4000/user', data);
  } catch (error) {
    return null;
  }
};

export const login = (parameter) => ({ type: LOGIN, payload: loginAPI(parameter) });
export const signup = (parameter) => ({ type: SIGNUP, payload: signupAPI(parameter) });
export const loadUsers = (parameter) => ({
  type: LOAD_USERS,
  payload: delay(1000, usersDummyData),
});
export const loadMydata = (parameter) => ({
  type: LOAD_MY_DATA,
  payload: loadMyDataAPI(parameter),
});
export const filterUsers = (parameter) => ({
  type: FILTER_USERS,
  payload: parameter,
});
