import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Lottie from 'lottie-react';
import Flex from '../components/common/Flex';
import infiniteLoop from 'assets/img/animated-icons/infinite-loop.json';
import { Button, Modal } from 'react-bootstrap';

const PrivateMainLayoutRoute = ({ children }) => {
  const { initialized, keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;

  // eslint-disable-next-line react/react-in-jsx-scope
  if (!initialized) {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <Flex direction="column" justifyContent="center" alignItems="center">
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <Lottie
          animationData={infiniteLoop}
          loop={true}
          style={{ height: '120px', width: '120px' }}
        />
      </Flex>
    );
  }

  if (
    isLoggedIn &&
    keycloak.realmAccess.roles.includes(process.env.REACT_APP_BASE_REALM_ROLE)
  ) {
    return children;
  } else if (isLoggedIn) {
    // eslint-disable-next-line react/react-in-jsx-scope
    // return <>Not allowed by roles!</>;
    const goToLms = () => {
      window.location.href = process.env.REACT_APP_BASE_URL;
    };

    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <>
        {/* eslint-disable-next-line react/jsx-no-undef,react/react-in-jsx-scope */}
        <Modal
          show={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {/* eslint-disable-next-line react/react-in-jsx-scope */}
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Ошибка доступа к веб-ресурсу
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              У Вас недостаточно прав для доступа к CRM-системе. Пожалуйста,
              обратитесь к администраторам.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => goToLms()}>Перейти на LMS</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    keycloak.login({ redirectUri: window.location.url }).then(r => null);
  }
};

export default PrivateMainLayoutRoute;
