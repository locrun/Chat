import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewСonversation from '../pages/NewСonversation/NewСonversation';
import { AdminMessages } from '../pages/AdminMessages/AdminMessages';
import { Example } from '../pages/Example/Example';
const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/admin-messages" element={<AdminMessages />} />
      <Route path="/new-conversation" element={<NewСonversation />} />
    </Routes>
  );
};
export default RoutesPage;
