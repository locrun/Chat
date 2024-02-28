import axios from 'axios';

export const BASE_URL = 'https://lms-api.mdev.uz/api/v1';

const createApiInstance = (role: string) => {
  return axios.create({
    baseURL: `${BASE_URL}/${role}`,
    headers: {
      Authorization: `${role}_` + 3,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
};

const client_api = createApiInstance('client');
const curator_api = createApiInstance('curator');

const Apis = {
  client_api,
  curator_api
};
export default Apis;
