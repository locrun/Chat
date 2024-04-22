import React, { useEffect, useContext, useState } from 'react';
import { useConnectSocket } from 'hooks/useConnectSocket';
import Chat from 'components/app/chat/Chat';
import Search from 'components/doc-components/Search';
import { getClientChats, getMessagesListClient } from 'api/routes/clientChat';
import MessageStarting from 'components/message-starting/MessageStarting';
import { ChatContext } from 'context/Context';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';

import s from './StudentChat.module.scss';

export const StudentChat = () => {
  const {
    newMessageSocket,
    threadsDispatch,
    messages,
    messagesDispatch,
    setKey,
    currentThread,
    setCurrentThread,
    setScrollToBottom,
    isAddNewChat,
    setIsAddNewChat
  } = useContext(ChatContext);
  const [isThreadsEmpty, setIsThreadsEmpty] = useState(false);
  const { changePage } = usePage();

  useConnectSocket();

  useEffect(() => {
    const getClientMessages = async () => {
      const {
        data: { results }
      } = await getClientChats({});

      const findChatById = results.find(
        thread => thread.id === newMessageSocket?.data.chat
      );

      if (findChatById && currentThread?.id === findChatById?.id) {
        const { data: messages } = await getMessagesListClient({
          id: findChatById.id
        });

        messagesDispatch({
          type: 'SET_MESSAGES',
          payload: messages.results
        });
      }
    };

    getClientMessages();
  }, [newMessageSocket, currentThread]);

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

        messagesDispatch({
          type: 'SET_MESSAGES',
          payload: messages.results
        });

        setIsAddNewChat(false);
        setScrollToBottom(true);
      }
    };

    fetchClentDialogs();
  }, [messages]);

  return (
    <div className={s.container}>
      <div className={s.search}>
        <Search />
      </div>
      {isThreadsEmpty ? (
        <MessageStarting />
      ) : (
        <>
          <Chat />
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
