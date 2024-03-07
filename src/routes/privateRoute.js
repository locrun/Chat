import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Lottie from 'lottie-react';
import Flex from '../components/common/Flex';
import infiniteLoop from 'assets/img/animated-icons/infinite-loop.json';
import { Alert, Button, Modal } from 'react-bootstrap';
import { checkAllRealmRolesAssigned } from '../helpers/utils';

const PrivateRoute = ({ children, requiredRoles, pageName }) => {
  const { initialized, keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;

  if (
    typeof requiredRoles === 'undefined' ||
    checkAllRealmRolesAssigned(keycloak.realmAccess.roles, requiredRoles)
  ) {
    return children;
  } else {
    // если requiredRoles назначены, но у пользователя нет всех необходимых прав
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>Ошибка доступа к веб-ресурсу</Alert.Heading>
        <p>
          У Вас недостаточно прав для доступа к странице {pageName}. Пожалуйста,
          обратитесь к администраторам.
        </p>
      </Alert>
    );
  }
};

export default PrivateRoute;
