import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Example } from '../pages/Example';
const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/example" element={<Example />} />
    </Routes>
  );
};
export default RoutesPage;
