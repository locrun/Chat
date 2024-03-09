import React, { useEffect, useContext } from 'react';
import Chat from 'components/app/chat/Chat';
import Search from 'components/doc-components/Search';
import s from './StudentChat.module.scss';
import { getClientChats } from 'api/routes/clientChat';

import { ChatContext } from 'context/Context';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';

export const StudentChat = () => {
  const { threadsDispatch } = useContext(ChatContext);
  const { changePage } = usePage();

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
      <button
        onClick={() => changePage(PageType.TOPIC)}
        className={s.linkButton}
      >
        Новый разговор
      </button>
    </div>
  );
};
