import React, { useEffect, useState, useContext, ChangeEvent } from 'react';
import Chat from 'components/app/chat/Chat';
import {
  TopicsContext,
  TopicsContextType
} from 'components/app/topics/TopicsProvider';
import { ChatContext } from 'context/Context';
//import { ProfileUserCard } from 'components/ProfileUserCard/ProfileUserCard';
import { ControlMessages } from 'components/ControlMessages/ControlMessages';
import { FilterMessages } from 'components/FilterMessages/FilterMessages';
import { getCuratorChats } from 'api/routes/curatorChat';
import { checkboxData } from 'data/checkboxData';

import s from './AdminChat.module.scss';

export const AdminChat = () => {
  const { topics } = useContext(TopicsContext) as TopicsContextType;
  const { threadsDispatch } = useContext(ChatContext);
  const [checkboxList, setCheckboxList] = useState(checkboxData);

  const [typeMessages, setTypeMessages] = useState('');
  const [messagesByDate, setMessagesByDate] = useState('');
  const [statusMessages, setStatusMessages] = useState('');
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>('');
  const [chosenCheckboxes, setChosenCheckboxes] = useState<string[]>([]);
  const [topicType, setTopicType] = useState('');

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
      const params = {
        chat_type: typeMessages,
        ordering: messagesByDate,
        status: statusMessages,
        chats: selectedValuesString || selectedRadioValue,
        topic: topicType
      };

      const { data } = await getCuratorChats(params);
      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: data.results
      });
    };

    fetchDialogs();
  }, [
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

      <div className={s.flex}>
        <div className={s.chatWrapper}>
          <Chat />
        </div>
        {/*<ProfileUserCard />  TODO: remove temporarily*/}
      </div>
    </div>
  );
};
