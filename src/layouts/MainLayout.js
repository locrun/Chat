import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PrivateRoute from 'routes/privateRoute';

import { useAppContext } from 'Main';
import { useKeycloak } from '@react-keycloak/web';
import Apis from 'api/index';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import keycloakRealmRoles from 'helpers/keycloakRealmRoles';
import { ChatTopic } from 'pages/ChatTopic/ChatTopic';
import { AdminChat } from 'pages/AdminChat/AdminChat';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';
import { Chats } from './Chats';

const MainLayout = () => {
  const { hash, pathname } = useLocation();

  const { keycloak } = useKeycloak();
  const { page } = usePage();

  if (
    checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
      keycloakRealmRoles.CHAT_USER
    ])
  ) {
    Apis.client_api.interceptors.request.use(function (config) {
      if (typeof window !== 'undefined') {
        config.headers['Authorization'] = `${keycloak.token}`; // token - токен из кейклока - главная строка
      }
      return config;
    });
  } else if (
    checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
      keycloakRealmRoles.CHAT_MANAGER
    ])
  ) {
    Apis.curator_api.interceptors.request.use(function (config) {
      if (typeof window !== 'undefined') {
        config.headers['Authorization'] = `${keycloak.token}`; // token - токен из кейклока - главная строка
      }
      return config;
    });
    Apis.client_api.interceptors.request.use(function (config) {
      if (typeof window !== 'undefined') {
        config.headers['Authorization'] = `${keycloak.token}`; // token - токен из кейклока - главная строка
      }
      return config;
    });
  }

  const {
    config: { isFluid }
  } = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getPage = () => {
    switch (page) {
      case PageType.CHAT:
        return <Chats />;
      case PageType.TOPIC:
        return (
          <PrivateRoute
            requiredRoles={[keycloakRealmRoles.CHAT_USER]}
            pageName={'Топики'}
          >
            <ChatTopic />
          </PrivateRoute>
        );
      case PageType.STUDENTPROFILE:
        return (
          <PrivateRoute
            requiredRoles={[keycloakRealmRoles.CHAT_MANAGER]}
            pageName={'Профиль студента'}
          >
            <AdminChat />
          </PrivateRoute>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={isFluid ? 'container-fluid' : 'container'}>{getPage()}</div>
  );
};

export default MainLayout;
