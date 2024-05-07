import React, { useEffect, useState, useContext, ChangeEvent } from 'react';
import Chat from 'components/app/chat/Chat';
import { useConnectSocket } from 'hooks/useConnectSocket';
import {
  TopicsContext,
  TopicsContextType
} from 'components/app/topics/TopicsProvider';
import { ChatContext } from 'context/Context';
import { ProfileUserCard } from 'components/ProfileUserCard/ProfileUserCard';
import { ControlMessages } from 'components/ControlMessages/ControlMessages';
import { FilterMessages } from 'components/FilterMessages/FilterMessages';
import {
  getCuratorChats,
  getMessagesListCurator
} from 'api/routes/curatorChat';
import { checkboxData } from 'data/checkboxData';
import { LMSAccounts } from 'api/routes/newLMS';

import cn from 'classnames';
import s from './AdminChat.module.scss';

export const AdminChat = () => {
  const { topics } = useContext(TopicsContext) as TopicsContextType;

  const {
    newChat,
    setTotalChatsCount,
    searchValue,
    limit,
    limitMessages,
    setPreviousMessages,
    socketDeletedMessage,
    socketUpdatedMessage,
    readChatMessage,
    socketAssignCurator,
    newMessageSocket,
    threadsDispatch,
    setKey,
    currentThread,
    setCurrentThread,
    messagesDispatch,
    setLmsUsers,
    profileCardVisible,
    currentLmsUser
  } = useContext(ChatContext);
  useConnectSocket();

  const [checkboxList, setCheckboxList] = useState(checkboxData);

  const [typeMessages, setTypeMessages] = useState('topic');
  const [messagesByDate, setMessagesByDate] = useState('');
  const [statusMessages, setStatusMessages] = useState('');
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>('');
  const [chosenCheckboxes, setChosenCheckboxes] = useState<string[]>([]);
  const [topicType, setTopicType] = useState('');

  useEffect(() => {
    const fetchLazyLoadingMessages = async () => {
      if (currentThread) {
        const { data } = await getMessagesListCurator({
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
      const {
        data: { results }
      } = await getCuratorChats({});

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: results
      });
    };

    readChatMessage && fetchChats();
  }, [readChatMessage]);

  useEffect(() => {
    const fetchChats = async () => {
      const {
        data: { results }
      } = await getCuratorChats({});

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: results
      });
      const currentCuratorChat = results.find(
        thread => thread.id === newChat?.data?.chat_id
      )!;

      setCurrentThread(currentCuratorChat);

      messagesDispatch({
        type: 'SET_MESSAGES',
        payload: []
      });
    };

    fetchChats();
    setKey(newChat?.data.chat_id);
  }, [newChat]);

  useEffect(() => {
    const fetchChats = async () => {
      const {
        data: { results }
      } = await getCuratorChats({});

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: results
      });
      if (newMessageSocket?.data?.chat_id === currentThread?.id) {
        const { data: messages } = await getMessagesListCurator({
          id: newMessageSocket?.data?.chat_id
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
      } = await getCuratorChats({});

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: results
      });
      if (socketDeletedMessage?.data?.chat_id === currentThread?.id) {
        const { data: messages } = await getMessagesListCurator({
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
      } = await getCuratorChats({});

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: results
      });
      if (socketUpdatedMessage?.data?.chat_id === currentThread?.id) {
        const { data: messages } = await getMessagesListCurator({
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

  useEffect(() => {
    const fetchChats = async () => {
      const {
        data: { results }
      } = await getCuratorChats({});

      const currentCuratorChat = results.find(
        thread => thread.id === socketAssignCurator?.data?.chat_id
      )!;

      setCurrentThread(currentCuratorChat);
    };

    socketAssignCurator && fetchChats();
  }, [socketAssignCurator]);

  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(event.target.value);
    setCheckboxList(prevCheckboxes => {
      return prevCheckboxes.map(checkbox => {
        return { ...checkbox, isChecked: true };
      });
    });
  };

  const handleChangeCheckbox = (id: number) => {
    const hasCheckedCheckbox = checkboxList.some(item => {
      return item.isChecked;
    });

    if (hasCheckedCheckbox) {
      setSelectedRadioValue('');
    }
    setCheckboxList(prevCheckboxes => {
      return prevCheckboxes.map(checkbox => {
        if (checkbox.id === id)
          return { ...checkbox, isChecked: !checkbox.isChecked };
        else {
          return checkbox;
        }
      });
    });
  };

  useEffect(() => {
    const selectedValues = checkboxList
      .filter(checkbox => checkbox.isChecked)
      .map(checkbox => checkbox.value);
    setChosenCheckboxes(selectedValues);

    const hasCheckedCheckbox = checkboxList.every(item => {
      return item.isChecked;
    });
    if (hasCheckedCheckbox) {
      setSelectedRadioValue('all');
    }
  }, [checkboxList]);

  useEffect(() => {
    const selectedValuesString =
      chosenCheckboxes.length > 0 ? chosenCheckboxes.join(',') : null;

    const fetchDialogs = async () => {
      let params = {
        chat_type: typeMessages ? typeMessages : undefined,
        ordering: messagesByDate ? messagesByDate : undefined,
        status: statusMessages ? statusMessages : undefined,
        chats:
          selectedValuesString || selectedRadioValue
            ? selectedValuesString || selectedRadioValue
            : undefined,
        topic: topicType ? topicType : undefined,
        search: searchValue ? searchValue : undefined,
        limit: limit
      };

      if (statusMessages === 'is_working_for_others') {
        params = {
          ...params,
          status: 'in_progress',
          chats: 'others'
        };
      }

      if (statusMessages === 'in_progress') {
        params = {
          ...params,
          status: 'in_progress',
          chats: 'my'
        };
      }

      const filteredParams = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(params).filter(([_, v]) => v !== undefined)
      );

      const { data: users } = await LMSAccounts();

      setLmsUsers(users);
      if (Object.keys(filteredParams).length > 0) {
        const { data } = await getCuratorChats(filteredParams);

        setTotalChatsCount(data.count);

        threadsDispatch({
          type: 'SET_DIALOGS',
          payload: data.results
        });
      }
    };

    fetchDialogs();
  }, [
    limit,
    searchValue,
    typeMessages,
    messagesByDate,
    statusMessages,
    selectedRadioValue,
    chosenCheckboxes,
    topicType
  ]);

  const handleTypeMessagesChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeMessages(event.target.value);
  };

  const handleSortingMessagesChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setMessagesByDate(event.target.value);
  };

  const handleStatusMessagesChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusMessages(event.target.value);
  };

  const handleTypeTopicChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTopicType(event.target.value);
  };

  return (
    <div className={s.container}>
      <FilterMessages
        checkboxList={checkboxList}
        isChecked={selectedRadioValue === 'all'}
        handleChangeRadio={handleChangeRadio}
        handleChangeCheckbox={handleChangeCheckbox}
        handleTypeMessagesChange={handleTypeMessagesChange}
        handleStatusMessagesChange={handleStatusMessagesChange}
        handleSortingMessagesChange={handleSortingMessagesChange}
      />

      {typeMessages === 'topic' && (
        <ControlMessages
          topics={topics}
          handleTypeTopicChange={handleTypeTopicChange}
        />
      )}

      <div
        className={cn(s.chatWrapper, {
          [s.extraChatWrapper]: typeMessages
        })}
      >
        <Chat />
        <div
          className={cn(s.profileCardWrapper, {
            [s.extraProfileCardWrapper]: typeMessages
          })}
        >
          {profileCardVisible && currentLmsUser && <ProfileUserCard />}
        </div>
      </div>
    </div>
  );
};
