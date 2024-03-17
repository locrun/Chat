import { useKeycloak } from '@react-keycloak/web';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import keycloakRealmRoles from './keycloakRealmRoles';

export const checkRoles = () => {
  const { keycloak } = useKeycloak();
  const isClient = checkAllRealmRolesAssigned(keycloak.realmAccess?.roles, [
    keycloakRealmRoles.CHAT_USER
  ]);

  return isClient;
};
