import React from 'react';
import Chat from 'components/app/chat/Chat';
import ProfileUserCard from 'components/ProfileUserCard/ProfileUserCard';
import { ControlMessages } from 'components/ControlMessages/ControlMessages';
import { FilterMessages } from 'components/FilterMessages/FilterMessages';

import s from './StudentProfile.module.scss';

export const StudentProfile = () => {
  return (
    <div className={s.container}>
      <FilterMessages />
      <ControlMessages />
      <div className={s.flex}>
        <div className={s.chatWrapper}>
          <Chat />
        </div>
        <ProfileUserCard />
      </div>
    </div>
  );
};
