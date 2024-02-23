import axios from 'axios';

export const BASE_URL = 'https://lms-api.mdev.uz/api/v1';

const chat_api = axios.create({
  baseURL: `${BASE_URL}/client`,
  headers: {
    Authorization: 'client_' + 3,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const Apis = {
  chat_api
};
export default Apis;
