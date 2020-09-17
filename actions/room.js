import {
  FILTER_ROOMS,
  LOAD_ROOMS,
  CREATE_ROOM,
  LOAD_ROOM,
  UPDATE_ROOM,
  UPLOAD_ROOM_IMAGE,
} from '../reducers/room';
import axios from 'axios';

function delay(time, data = null) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );
}

const loadRoomsAPI = () => {
  try {
    return axios.get('/rooms');
  } catch (error) {
    return null;
  }
};

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

const updateRoomAPI = (data) => {
  try {
    return axios.put(`/room/${data.id}`, data);
  } catch (error) {
    return null;
  }
};

const uploadRoomImageAPI = (data) => {
  try {
    return axios.post('/room/image', data);
  } catch (error) {
    return null;
  }
};

export const loadRooms = () => ({
  type: LOAD_ROOMS,
  payload: loadRoomsAPI(),
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
export const updateRoom = (parameter) => ({
  type: UPDATE_ROOM,
  payload: updateRoomAPI(parameter),
});
export const uploadRoomImage = (parameter) => ({
  type: UPLOAD_ROOM_IMAGE,
  payload: uploadRoomImageAPI(parameter),
});
