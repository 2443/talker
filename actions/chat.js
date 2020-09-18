import axios from 'axios';

export const sendImagesAPI = (data) => {
  try {
    return axios.post('/chat/image', data);
  } catch (error) {
    return null;
  }
};
