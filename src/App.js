import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import is from 'is_js';
import FalconRoutes from 'routes';
import RoutesPage from 'routes/main';
import { CloseButton } from 'components/common/Toast';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useAppContext } from 'Main';
import TestRoutes from 'routes/testRoutes';

const App = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  const {
    config: { navbarPosition }
  } = useAppContext();

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
    if (is.safari()) {
      HTMLClassList.add('safari');
    }
  }, [HTMLClassList]);

  useEffect(() => {
    if (navbarPosition === 'double-top') {
      HTMLClassList.add('double-top-nav-layout');
    }
    return () => HTMLClassList.remove('double-top-nav-layout');
  }, [navbarPosition]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <TestRoutes />
      {/*<RoutesPage />*/}
      {/*<FalconRoutes />*/}
      <SettingsToggle />
      <SettingsPanel />
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </Router>
  );
};

export default App;
