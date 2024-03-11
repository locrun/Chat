import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChatTopic } from '../pages/ChatTopic/ChatTopic';
import { AdminChat } from '../pages/AdminChat/AdminChat';
import { StudentChat } from 'pages/StudentChat/StudentChat';
import { Example } from '../pages/Example/Example';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/chat-topic" element={<ChatTopic />} />
      <Route path="/admin-chat" element={<AdminChat />} />
      <Route path="/student-chat" element={<StudentChat />} />
    </Routes>
  );
};
export default RoutesPage;
