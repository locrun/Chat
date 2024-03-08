import { Route, Routes, Navigate } from 'react-router-dom';
import { ChatTopic } from 'pages/ChatTopic/ChatTopic';
import { StudentProfile } from 'pages/StudentProfile/StudentProfile';
import { AdminChat } from 'pages/AdminChat/AdminChat';
import { StudentChat } from 'pages/StudentChat/StudentChat';
import MainLayout from 'layouts/MainLayout';
import PrivateMainLayoutRoute from 'routes/privateMainLayoutRoute';
import PrivateRoute from 'routes/privateRoute';
import keycloakRealmRoles from 'helpers/keycloakRealmRoles';
import { MainPage } from 'layouts/MainPage';
import { Example } from 'pages/Example/Example';

const TestRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PrivateMainLayoutRoute>
            <MainLayout />
          </PrivateMainLayoutRoute>
        }
      >
        {<Route path="/" element={<Example />} />}
        <Route
          path="/admin-chat"
          element={
            <PrivateRoute
              requiredRoles={[keycloakRealmRoles.CHAT_MANAGER]}
              pageName={'дефолтный дашборд'}
            >
              <AdminChat />
            </PrivateRoute>
          }
        />
        <Route
          path="new-chat"
          element={
            <PrivateRoute
              requiredRoles={[keycloakRealmRoles.CHAT_USER]}
              pageName={'дефолтный дашборд'}
            >
              <ChatTopic />
            </PrivateRoute>
          }
        />
        <Route
          path="/student-profile"
          element={
            <PrivateRoute
              requiredRoles={[keycloakRealmRoles.CHAT_MANAGER]}
              pageName={'дефолтный дашборд'}
            >
              <StudentProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/student-chat"
          element={
            <PrivateRoute
              requiredRoles={[keycloakRealmRoles.CHAT_USER]}
              pageName={'дефолтный дашборд'}
            >
              <StudentChat />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/errors/404" replace />} />
      </Route>
    </Routes>
  );
};

export default TestRoutes;
