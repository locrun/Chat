import React from 'react';
import { AdminChat } from 'pages/AdminChat/AdminChat';
import { StudentChat } from 'pages/StudentChat/StudentChat';
import { useKeycloak } from '@react-keycloak/web';
import keycloakRealmRoles from 'helpers/keycloakRealmRoles';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import { StudentProfile } from 'pages/StudentProfile/StudentProfile';

export const MainPage = () => {
  const { keycloak } = useKeycloak();

  if (
    checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
      keycloakRealmRoles.CHAT_USER
    ])
  ) {
    return <StudentChat />;
  }
  if (
    checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
      keycloakRealmRoles.CHAT_MANAGER
    ])
  ) {
    return <StudentProfile />;
  }
  return <div>MainPage</div>;
};
