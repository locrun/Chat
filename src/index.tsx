import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'helpers/initFA';
import Main from 'Main';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from 'keycloak';

const container = document.getElementById('main') as HTMLElement;
const root = createRoot(container);

const keycloakInitOptions = {
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
  flow: 'implicit'
};

root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={keycloakInitOptions}
  >
    <React.StrictMode>
      <Main>
        <App />
      </Main>
    </React.StrictMode>
  </ReactKeycloakProvider>
);
