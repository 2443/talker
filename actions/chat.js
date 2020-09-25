import axios from 'axios';

export const sendImagesAPI = (data) => {
  try {
    return axios.post('/chat/image', data);
  } catch (error) {
    return null;
  }
};

export const loadNewChatAPI = (data) => {
  try {
    return axios.post('/', data);
  } catch (error) {
    return null;
  }
};
