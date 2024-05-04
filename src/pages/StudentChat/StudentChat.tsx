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

export interface Socket {
  event_type: string;
  data: {
    chat?: number;
    chat_id?: number;
    created_at: string;
    files: [];
    id: number;
    is_read: boolean;
    message_type: string;
    sender: number;
    text: string;
  };
}

export const StudentChat = () => {
  const {
    limit,
    limitMessages,
    setPreviousMessages,
    searchValue,
    setTotalChatsCount,
    newChat,
    socketDeletedMessage,
    socketUpdatedMessage,
    newMessageSocket,
    readChatMessage,
    threadsDispatch,
    messagesDispatch,
    currentThread
  } = useContext(ChatContext);

  useConnectSocket();
  const { changePage } = usePage();
  const [isThreadsEmpty, setIsThreadsEmpty] = useState(false);

  useEffect(() => {
    const fetchLazyLoadingMessages = async () => {
      if (currentThread) {
        const { data } = await getMessagesListClient({
          limit: limitMessages,
          id: currentThread?.id
        });
        setPreviousMessages(data.previous);
        messagesDispatch({
          type: 'SET_MESSAGES',
          payload: data.results
        });
      }
    };
    fetchLazyLoadingMessages();
  }, [currentThread, limitMessages]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await getClientChats({ search: searchValue, limit });
      setTotalChatsCount(data.count);

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: data.results
      });
    };

    fetchChats();
  }, [searchValue, limit]);

  useEffect(() => {
    const fetchChats = async () => {
      const {
        data: { results }
      } = await getClientChats({});

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: results
      });
    };

    readChatMessage && fetchChats();
  }, [readChatMessage]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await getClientChats({});
      setTotalChatsCount(data.count);
      if (data.results.length === 0) setIsThreadsEmpty(true);

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: data.results
      });

      messagesDispatch({
        type: 'SET_MESSAGES',
        payload: []
      });
    };

    fetchChats();
  }, [newChat]);

  useEffect(() => {
    const fetchChats = async () => {
      const {
        data: { results }
      } = await getClientChats({});

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: results
      });
      if (newMessageSocket?.data?.chat_id === currentThread?.id) {
        const { data: messages } = await getMessagesListClient({
          id: newMessageSocket.data.chat_id
        });

        messagesDispatch({
          type: 'SET_MESSAGES',
          payload: messages.results
        });
      }
    };

    newMessageSocket && fetchChats();
  }, [newMessageSocket, currentThread]);

  useEffect(() => {
    const fetchChats = async () => {
      const {
        data: { results }
      } = await getClientChats({});

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: results
      });
      if (socketDeletedMessage?.data?.chat_id === currentThread?.id) {
        const { data: messages } = await getMessagesListClient({
          id: socketDeletedMessage?.data?.chat_id
        });

        messagesDispatch({
          type: 'SET_MESSAGES',
          payload: messages.results
        });
      }
    };

    socketDeletedMessage && fetchChats();
  }, [socketDeletedMessage, currentThread]);

  useEffect(() => {
    const fetchChats = async () => {
      const {
        data: { results }
      } = await getClientChats({});

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: results
      });
      if (socketUpdatedMessage?.data?.chat_id === currentThread?.id) {
        const { data: messages } = await getMessagesListClient({
          id: socketUpdatedMessage?.data?.chat_id
        });

        messagesDispatch({
          type: 'SET_MESSAGES',
          payload: messages.results
        });
      }
    };

    socketUpdatedMessage && fetchChats();
  }, [socketUpdatedMessage, currentThread]);

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
