import {
  LOGIN,
  SIGNUP,
  LOAD_USERS,
  FILTER_USERS,
  LOAD_MY_DATA,
  LOAD_USER,
  REQUEST_ADD_FRIEND,
  RESPONSE_ADD_FRIEND,
  USER_UPDATE,
  USER_IMAGE_UPLOAD,
} from '../reducers/user';
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
    return axios.post('/login', data);
  } catch (error) {
    return null;
  }
};

const loadMyDataAPI = (data) => {
  try {
    return axios.get('/user', data);
  } catch (error) {
    return null;
  }
};

const loadUsersAPI = (data) => {
  try {
    return axios.get('/users');
  } catch (error) {
    return null;
  }
};
const loadUserAPI = (data) => {
  try {
    return axios.get(`/user/${data}`);
  } catch (error) {
    return null;
  }
};

const requestAddFriendAPI = (data) => {
  try {
    return axios.post(`/user/friend/${data}`);
  } catch (error) {
    return null;
  }
};

const responseAddFriendAPI = (data) => {
  try {
    const { id, state } = data;
    return axios.patch(`/user/friend/${id}`, { state });
  } catch (error) {
    return null;
  }
};

const userUpdateAPI = (data) => {
  try {
    return axios.put('/user', data);
  } catch (error) {
    return null;
  }
};

const userImageUploadAPI = (data) => {
  try {
    return axios.post('/user/image', data);
  } catch (error) {
    return null;
  }
};

export const login = (parameter) => ({ type: LOGIN, payload: loginAPI(parameter) });
export const signup = (parameter) => ({ type: SIGNUP, payload: signupAPI(parameter) });
export const loadUsers = (parameter) => ({
  type: LOAD_USERS,
  payload: loadUsersAPI(),
});
export const loadUser = (parameter) => ({
  type: LOAD_USER,
  payload: loadUserAPI(parameter),
});
export const loadMydata = (parameter) => ({
  type: LOAD_MY_DATA,
  payload: loadMyDataAPI(parameter),
});
export const filterUsers = (parameter) => ({
  type: FILTER_USERS,
  payload: parameter,
});
export const requestAddFriend = (parameter) => ({
  type: REQUEST_ADD_FRIEND,
  payload: requestAddFriendAPI(parameter),
});
export const responseAddFriend = (parameter) => ({
  type: RESPONSE_ADD_FRIEND,
  payload: responseAddFriendAPI(parameter),
});
export const userUpdate = (parameter) => ({
  type: USER_UPDATE,
  payload: userUpdateAPI(parameter),
});
export const userImageUpload = (parameter) => ({
  type: USER_IMAGE_UPLOAD,
  payload: userImageUploadAPI(parameter),
});
