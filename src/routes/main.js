import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Example } from '../pages/Example/Example';
import NewChat from '../pages/NewChat/NewChat';
import { StudentProfile } from 'pages/StudentProfile/StudentProfile';
import { AdminChat } from '../pages/AdminChat/AdminChat';
import { StudentChat } from 'pages/StudentChat/StudentChat';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/admin-chat" element={<AdminChat />} />
      <Route path="/student-chat" element={<StudentChat />} />
      <Route path="/new-chat" element={<NewChat />} />
      <Route path="/student-profile" element={<StudentProfile />} />
    </Routes>
  );
};
export default RoutesPage;
