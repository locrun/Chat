import axios from 'axios';

export const fetchAccessTokenKeycloak = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', process.env.REACT_APP_CLIENT_ID ?? '');
  params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET ?? '');

  return await axios.post(
    'https://keycloak.new-lms.ru/realms/master/protocol/openid-connect/token',
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': null,
        'X-Requested-With': null
      }
    }
  );
};
