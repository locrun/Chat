import axios from 'axios';

const LMS_API_BASE_URL = 'https://lms-api.mdev.uz/api/v1';

const createApiInstance = (role: string, access_token?: string) => {
  const roleNumber = role === 'client' ? 3 : 2;
  return axios.create({
    baseURL: `${LMS_API_BASE_URL}/${role}`,
    headers: {
      Authorization: `${role}_${roleNumber} ${access_token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

const client_api = createApiInstance('client');
const curator_api = createApiInstance('curator');

const Apis = {
  client_api,
  curator_api
};

export default Apis;
