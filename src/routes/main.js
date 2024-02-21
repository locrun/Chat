import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Example } from '../pages/Example/Example';
import NewСonversation from '../pages/NewСonversation/NewСonversation';
import { AdminChat } from '../pages/AdminChat/AdminChat';
import { StudentChat } from 'pages/StudentChat/StudentChat';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/admin-chat" element={<AdminChat />} />
      <Route path="/student-chat" element={<StudentChat />} />
      <Route path="/new-conversation" element={<NewСonversation />} />
    </Routes>
  );
};
export default RoutesPage;
