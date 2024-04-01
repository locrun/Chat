import React from 'react';
import { Completed } from './Completed/Completed';
import { Canceled } from './Canceled/Canceled';

export const Payment = () => {
  return (
    <>
      <Completed />
      <Canceled />
    </>
  );
};
