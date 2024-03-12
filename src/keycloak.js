import Keycloak from 'keycloak-js';
import PLATFORM_URL from './constants/index';

const keycloak = new Keycloak({
  url: PLATFORM_URL,
  realm: 'openedx',
  clientId: 'crm'
});

keycloak.onAuthSuccess = () => {
  console.log('Authentication Successful!');
};

keycloak.onAuthLogout = () => {
  console.log('User logged out!');
};

keycloak
  .updateToken(30, 'cc4a0745-c30d-4d96-888d-a7f071993e2a')
  .then(refreshed => {
    if (refreshed) {
      console.log('Token was successfully refreshed');
    } else {
      console.log('Token is still valid');
    }
  })
  .catch(() => {
    console.log('Failed to refresh the token, or the session has expired');
  });

/*keycloak
  .init({
    onLoad: 'login-required',
    checkLoginIframe: false
  })
  .then(authenticated => {
    if (!authenticated) {
      window.location.reload();
    } else {
      console.info('Authenticated');
    }
  })
  .catch(console.error);*/

export default keycloak;
