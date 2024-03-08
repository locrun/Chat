import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import Footer from 'components/footer/Footer';
import ProductProvider from 'components/app/e-commerce/ProductProvider';
import CourseProvider from 'components/app/e-learning/CourseProvider';
import ModalAuth from 'components/authentication/modal/ModalAuth';

import { useAppContext } from 'Main';
import { useKeycloak } from '@react-keycloak/web';
import Apis from 'api/index';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import keycloakRealmRoles from 'helpers/keycloakRealmRoles';
import { MainPage } from 'layouts/MainPage';
import { Example } from 'pages/Example/Example';

const MainLayout = () => {
  const { hash, pathname } = useLocation();
  const isKanban = pathname.includes('kanban');
  // const isChat = pathname.includes('chat');
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  //TODO: wait roles
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
    navigate('/student-chat');
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
    navigate('/admin-chat');
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

  return (
    <div className={isFluid ? 'container-fluid' : 'container'}>
      <MainPage />
    </div>
  );
};

export default MainLayout;
