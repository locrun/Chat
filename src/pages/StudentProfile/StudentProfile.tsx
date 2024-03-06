import React, { useEffect, useState, useContext, ChangeEvent } from 'react';
import Chat from 'components/app/chat/Chat';
import {
  TopicsContext,
  TopicsContextType
} from 'components/app/topics/TopicsProvider';
import ProfileUserCard from 'components/ProfileUserCard/ProfileUserCard';
import ControlMessages from 'components/ControlMessages/ControlMessages';
import { FilterMessages } from 'components/FilterMessages/FilterMessages';
import { getCuratorChats } from 'api/routes/curatorChat';
import { checkboxData } from 'data/checkboxData';
import s from './StudentProfile.module.scss';
import { ChatContext } from 'context/Context';

export const StudentProfile = () => {
  const { topics } = useContext(TopicsContext) as TopicsContextType;
  const { threadsDispatch } = useContext(ChatContext);
  const [checkboxList, setCheckboxList] = useState(checkboxData);

  const [typeMessages, setTypeMessages] = useState('');
  const [messagesByDate, setMessagesByDate] = useState('');
  const [statusMessages, setStatusMessages] = useState('');
  const [selectedRadioValue, setSelectedRadioValue] = useState('');
  const [chosenCheckboxes, setChosenCheckboxes] = useState<string[]>([]);
  const [topicType, setTopicType] = useState('');

  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(event.target.value);
  };

  const handleChangeCheckbox = (id: number) => {
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
  }, [checkboxList]);

  useEffect(() => {
    const selectedValuesString =
      chosenCheckboxes.length > 0 ? chosenCheckboxes.join(',') : null;

    const fetchDialogs = async () => {
      const params = {
        chat_type: typeMessages || undefined,
        ordering: messagesByDate || undefined,
        status: statusMessages || undefined,
        chats: selectedValuesString || selectedRadioValue || undefined,
        topic: topicType || undefined
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

  const handleChangeTopicType = (event: ChangeEvent<HTMLSelectElement>) => {
    setTopicType(event.target.value);
  };
  const handleChangeRedirection = () => {};

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
      <ControlMessages
        topics={topics}
        handleChangeTopicType={handleChangeTopicType}
        handleChangeRedirection={handleChangeRedirection}
      />
      <div className={s.flex}>
        <div className={s.chatWrapper}>
          <Chat />
        </div>
        <ProfileUserCard />
      </div>
    </div>
  );
};
