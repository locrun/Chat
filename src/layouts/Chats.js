import React from 'react';
import { AdminChat } from 'pages/AdminChat/AdminChat';
import { StudentChat } from 'pages/StudentChat/StudentChat';
import { useKeycloak } from '@react-keycloak/web';
import keycloakRealmRoles from 'helpers/keycloakRealmRoles';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import PrivateRoute from 'routes/privateRoute';

export const Chats = () => {
  const { keycloak } = useKeycloak();

  if (
    checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
      keycloakRealmRoles.CHAT_MANAGER
    ])
  ) {
    return (
      <PrivateRoute
        requiredRoles={[keycloakRealmRoles.CHAT_MANAGER]}
        pageName={'дефолтный дашборд'}
      >
        <AdminChat />
      </PrivateRoute>
    );
  }
  if (
    checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
      keycloakRealmRoles.CHAT_USER
    ])
  ) {
    return (
      <PrivateRoute
        requiredRoles={[keycloakRealmRoles.CHAT_USER]}
        pageName={'дефолтный дашборд'}
      >
        <StudentChat />
      </PrivateRoute>
    );
  }
  return <></>;
};
