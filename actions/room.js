import faker from 'faker';
import shortId from 'shortid';
import { FILTER_ROOMS, LOAD_ROOMS } from '../reducers/room';

function delay(time, data = null) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );
}

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
export const filterRooms = (parameter) => ({
  type: FILTER_ROOMS,
  payload: parameter,
});
