import axios from 'axios';

const API_BASE_URL = 'https://keycloak.new-lms.ru';

const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');
params.append('client_id', process.env.REACT_APP_CLIENT_ID ?? '');
params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET ?? '');

export const tokenKeycloakApi = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export const fetchAccessTokenKeycloak = async () => {
  try {
    const response = await tokenKeycloakApi.post(
      '/realms/openedx/protocol/openid-connect/token',
      params
    );
    return response;
  } catch (error) {
    console.error('Error fetching Keycloak access token:', error);
    throw error;
  }
};
