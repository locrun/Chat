import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewСonversation from 'pages/NewСonversation/NewСonversation';
import { AdminMessages } from 'pages/AdminMessages/AdminMessages';
import { Example } from '../pages/Example';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/example" element={<Example />} />
      <Route path="/new-conversation" element={<NewСonversation />} />
      <Route path="/admin-messages" element={<AdminMessages />} />
    </Routes>
  );
};
export default RoutesPage;
