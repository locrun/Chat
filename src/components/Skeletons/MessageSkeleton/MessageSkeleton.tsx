import React from 'react';
import { LeftSide } from './LeftSide/LeftSide';
import { RightSide } from './RightSide/RightSide';
export const MessageSkeleton = () => {
  return (
    <>
      <LeftSide />
      <RightSide />
      <LeftSide />
      <RightSide />
      <LeftSide />
    </>
  );
};
