import { useKeycloak } from '@react-keycloak/web';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import keycloakRealmRoles from '../helpers/keycloakRealmRoles';
type CallbackFunction = () => void;

export const useRolesActions = () => {
  const { keycloak } = useKeycloak();

  const divideAction = (
    clientCallback: CallbackFunction,
    curatorCallback: CallbackFunction
  ) => {
    if (
      keycloak.realmAccess &&
      checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
        keycloakRealmRoles.CHAT_USER
      ])
    ) {
      return clientCallback();
    } else if (
      keycloak.realmAccess &&
      checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
        keycloakRealmRoles.CHAT_MANAGER
      ])
    ) {
      return curatorCallback();
    }
  };

  return divideAction;
};
