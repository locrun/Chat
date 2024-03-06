import axios from 'axios';

export const BASE_URL = 'https://lms-api.mdev.uz/api/v1';

const createApiInstance = (role: string) => {
  const roleNumber = role === 'client' ? 3 : 2;
  return axios.create({
    baseURL: `${BASE_URL}/${role}`,
    headers: {
      Authorization: `${role}_` + roleNumber,
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
