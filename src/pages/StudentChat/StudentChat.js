import React from 'react';
import { Link } from 'react-router-dom';
import Chat from 'components/app/chat/Chat';
import Search from 'components/doc-components/Search';
import s from './StudentChat.module.scss';

export const StudentChat = () => {
  return (
    <div className={s.container}>
      <div className={s.search}>
        <Search />
      </div>
      <div className={s.chatWrapper}>
        <Chat />
      </div>
      <Link to={'/new-chat'} className={s.linkButton}>
        Новый разговор
      </Link>
    </div>
  );
};
