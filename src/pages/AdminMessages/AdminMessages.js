import React from 'react';
import Chat from 'components/app/chat/Chat';
import s from './AdminMessages.module.scss';
export const AdminMessages = () => {
  return (
    <div className={s.container}>
      <div className={s.chatWrapper}>
        <Chat />
      </div>
    </div>
  );
};
