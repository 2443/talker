import faker from 'faker';
import shortId from 'shortid';
import { FILTER_ROOMS, LOAD_ROOMS, CREATE_ROOM, LOAD_ROOM } from '../reducers/room';
import axios from 'axios';

function delay(time, data = null) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );
}

const loadRoomAPI = (data) => {
  try {
    return axios.get(`/room/${data}`);
  } catch (error) {
    return null;
  }
};

const createRoomAPI = (data) => {
  try {
    return axios.post(`/room`, data);
  } catch (error) {
    return null;
  }
};

export const createDummyRoom = () => ({
  id: shortId.generate(),
  name: faker.name.findName(),
  roomImage: faker.image.avatar(),
  lastMessage: faker.lorem.sentence(),
  lastChatTime: faker.date.past(),
});

const roomsDummyData = Array(10)
  .fill()
  .map(() => createDummyRoom());

export const loadRooms = (parameter) => ({
  type: LOAD_ROOMS,
  payload: delay(1000, roomsDummyData),
});
export const loadRoom = (parameter) => ({
  type: LOAD_ROOM,
  payload: loadRoomAPI(parameter),
});
export const filterRooms = (parameter) => ({
  type: FILTER_ROOMS,
  payload: parameter,
});
export const createRoom = (parameter) => ({
  type: CREATE_ROOM,
  payload: createRoomAPI(parameter),
});
