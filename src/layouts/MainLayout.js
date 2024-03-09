import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import Footer from 'components/footer/Footer';
import ProductProvider from 'components/app/e-commerce/ProductProvider';
import CourseProvider from 'components/app/e-learning/CourseProvider';
import ModalAuth from 'components/authentication/modal/ModalAuth';
import PrivateRoute from 'routes/privateRoute';

import { useAppContext } from 'Main';
import { useKeycloak } from '@react-keycloak/web';
import Apis from 'api/index';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import keycloakRealmRoles from 'helpers/keycloakRealmRoles';
import { ChatTopic } from 'pages/ChatTopic/ChatTopic';
import { StudentProfile } from 'pages/StudentProfile/StudentProfile';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';
import { Chats } from './Chats';

const MainLayout = () => {
  const { hash, pathname } = useLocation();
  const isKanban = pathname.includes('kanban');
  // const isChat = pathname.includes('chat');
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
  }

  const {
    config: { isFluid, navbarPosition }
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
            <StudentProfile />
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
