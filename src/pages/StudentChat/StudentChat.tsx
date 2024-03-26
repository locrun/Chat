import React, { useEffect, useContext, useState } from 'react';
import Chat from 'components/app/chat/Chat';
import { useConnectSocket } from 'hooks/useConnectSocket';
import Search from 'components/doc-components/Search';
import { getClientChats } from 'api/routes/clientChat';
import MessageStarting from 'components/message-starting/MessageStarting';
import { ChatContext } from 'context/Context';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';
import s from './StudentChat.module.scss';
import { getMessagesListCurator } from 'api/routes/curatorChat';
import { getMessagesListClient } from 'api/routes/clientChat';
import { checkRoles } from 'helpers/checkRoles';

export const StudentChat = () => {
  const {
    threadsDispatch,
    messagesDispatch,
    setKey,
    setCurrentThread,
    setScrollToBottom,
    isAddNewChat,
    setIsAddNewChat
  } = useContext(ChatContext);
  const [isThreadsEmpty, setIsThreadsEmpty] = useState(false);
  const { changePage } = usePage();

  const isChatClient = checkRoles();

  useConnectSocket();

  useEffect(() => {
    const fetchClentDialogs = async () => {
      const params = {};

      const { data } = await getClientChats(params);

      if (data.results.length === 0) setIsThreadsEmpty(true);

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: data.results
      });

      const thread = data.results[0];
      if (thread && isAddNewChat) {
        setKey(thread.id);
        setCurrentThread(thread);

        const { data: messages } = isChatClient
          ? await getMessagesListClient({ id: thread.id })
          : await getMessagesListCurator({ id: thread.id });

        messagesDispatch({
          type: 'SET_MESSAGES',
          payload: messages.results
        });

        setIsAddNewChat(false);
        setScrollToBottom(true);
      }
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
