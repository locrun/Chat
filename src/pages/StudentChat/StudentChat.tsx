import React, { useEffect, useContext, useState } from 'react';
import Chat from 'components/app/chat/Chat';
import Search from 'components/doc-components/Search';
import { getClientChats } from 'api/routes/clientChat';
import MessageStarting from 'components/message-starting/MessageStarting';
import { ChatContext } from 'context/Context';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';
import s from './StudentChat.module.scss';

export const StudentChat = () => {
  const { threadsDispatch } = useContext(ChatContext);
  const [isThreadsEmpty, setIsThreadsEmpty] = useState(false);
  const { changePage } = usePage();

  useEffect(() => {
    const fetchClentDialogs = async () => {
      const params = {};

      const { data } = await getClientChats(params);

      if (data.results.length === 0) setIsThreadsEmpty(true);

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
      {isThreadsEmpty ? (
        <MessageStarting />
      ) : (
        <>
          <div className={s.chatWrapper}>
            <Chat />
          </div>
          <button
            onClick={() => changePage(PageType.TOPIC)}
            className={s.linkButton}
          >
            Новый разговор
          </button>
        </>
      )}
    </div>
  );
};
