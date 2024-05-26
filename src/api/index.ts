import axios from 'axios';

const LMS_API_BASE_URL = 'https://lms-api.mdev.uz/api/v1';
const KEYCLOAK_API_BASE_URL = 'https://keycloak.new-lms.ru';

const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');
params.append('client_id', process.env.REACT_APP_CLIENT_ID ?? '');
params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET ?? '');

export const tokenKeycloakApi = axios.create({
  baseURL: `${KEYCLOAK_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

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

export const fetchAccessTokenKeycloak = async () => {
  try {
    const {
      data: { access_token }
    } = await tokenKeycloakApi.post(
      '/realms/openedx/protocol/openid-connect/token',
      params
    );

    createApiInstance('client', process.env.REACT_APP_LMS_APP_TOKEN);
    createApiInstance('curator', process.env.REACT_APP_LMS_APP_TOKEN);

    return access_token;
  } catch (error) {
    console.error('Error fetching Keycloak access token:', error);
    throw error;
  }
};

export default Apis;
