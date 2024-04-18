import React, { useEffect, useContext, useState } from 'react';
import { useConnectSocket } from 'hooks/useConnectSocket';
import Chat from 'components/app/chat/Chat';
import Search from 'components/doc-components/Search';
import { getClientChats } from 'api/routes/clientChat';
import MessageStarting from 'components/message-starting/MessageStarting';
import { ChatContext } from 'context/Context';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';
import s from './StudentChat.module.scss';
import { getMessagesListCurator } from 'api/routes/curatorChat';

import { Message } from 'types/chat';
import { checkRoles } from 'helpers/checkRoles';

export const StudentChat = () => {
  const {
    newMessageSocket,
    readChatMessage,
    currentThread,
    threadsDispatch,
    messages,
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
    if (newMessageSocket) {
      if (
        !messages.some(
          (item: Message) => item?.id === newMessageSocket?.data.id
        ) &&
        currentThread?.id === newMessageSocket.data.chat
      ) {
        messagesDispatch({
          type: 'SET_MESSAGES',
          payload: [...messages, newMessageSocket.data]
        });
      }
    }
    return;
  }, [newMessageSocket, currentThread, isChatClient]);

  useEffect(() => {
    if (readChatMessage) {
      const maps = messages.map((message: Message) => {
        if (message.id === readChatMessage.data.last_message_id) {
          return { ...message, is_read: true };
        }
        return message;
      });
      if (JSON.stringify(maps) !== JSON.stringify(messages)) {
        messagesDispatch({
          type: 'SET_MESSAGES',
          payload: maps
        });
      }
    }
  }, [readChatMessage, messages]);

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

        const { data: messages } = await getMessagesListCurator({
          id: thread.id
        });

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
