import { LOGIN, SIGNUP, LOAD_USERS, FILTER_USERS } from '../reducers/user';
import faker from 'faker';
import shortId from 'shortid';
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

export const login = (parameter) => ({ type: LOGIN, payload: delay(1000, createDummyUser()) });
export const signup = (parameter) => ({ type: SIGNUP, payload: delay(1000) });
export const loadUsers = (parameter) => ({
  type: LOAD_USERS,
  payload: delay(1000, usersDummyData),
});
export const filterUsers = (parameter) => ({
  type: FILTER_USERS,
  payload: parameter,
});
