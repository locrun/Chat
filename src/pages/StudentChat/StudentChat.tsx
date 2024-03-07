import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Chat from 'components/app/chat/Chat';
import Search from 'components/doc-components/Search';
import s from './StudentChat.module.scss';
import { getClientChats } from 'api/routes/clientChat';

import { ChatContext } from 'context/Context';

export const StudentChat = () => {
  const { threadsDispatch } = useContext(ChatContext);
  useEffect(() => {
    const fetchClentDialogs = async () => {
      const params = {};

      const { data } = await getClientChats(params);

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: data.results
      });
    };
    fetchClentDialogs();
  }, []);

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
