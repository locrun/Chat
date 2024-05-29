import axios from 'axios';

const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');
params.append('client_id', process.env.REACT_APP_CLIENT_ID ?? '');
params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET ?? '');

export const tokenKeycloakApi = axios.create({
  baseURL: process.env.REACT_APP_KEYCLOAK_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export const fetchAccessTokenKeycloak = async () => {
  try {
    const {
      data: { access_token }
    } = await tokenKeycloakApi.post(
      `/realms/${process.env.REACT_APP_OPENEDX_REALM_NAME}/protocol/openid-connect/token`,
      params
    );

    return access_token;
  } catch (error) {
    console.error('Error fetching Keycloak access token:', error);
    throw error;
  }
};
