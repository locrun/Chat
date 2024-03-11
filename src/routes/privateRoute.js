import React from 'react';
import PropTypes from 'prop-types';
import { useKeycloak } from '@react-keycloak/web';

import { Alert } from 'react-bootstrap';
import { checkAllRealmRolesAssigned } from '../helpers/utils';

const PrivateRoute = ({ children, requiredRoles, pageName }) => {
  const { keycloak } = useKeycloak();

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
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired
};
export default PrivateRoute;
