import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import is from 'is_js';

import { CloseButton } from 'components/common/Toast';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useAppContext } from 'Main';
import MainLayout from 'layouts/MainLayout';
import PrivateMainLayoutRoute from 'routes/privateMainLayoutRoute';
import PagesProvider from 'components/app/pagesProvider/PagesProvider';

const reload = () => window.location.reload();

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
      <Routes>
        <Route
          path="/"
          element={
            <PagesProvider>
              <PrivateMainLayoutRoute>
                <MainLayout />
              </PrivateMainLayoutRoute>
            </PagesProvider>
          }
        />
        <Route path="/silent-check-sso.html" onEnter={reload} />
      </Routes>
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
