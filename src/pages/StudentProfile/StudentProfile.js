import React, { useEffect, useState } from 'react';
import Chat from 'components/app/chat/Chat';
import ProfileUserCard from 'components/ProfileUserCard/ProfileUserCard';
import ControlMessages from 'components/ControlMessages/ControlMessages';
import { FilterMessages } from 'components/FilterMessages/FilterMessages';
import { getCuratorChats } from 'api/routes/curatorChat';
import { checkbox } from 'data/checkboxses';
import s from './StudentProfile.module.scss';

export const StudentProfile = () => {
  const [checkboxses, setCheckboxes] = useState(checkbox);

  const [typeMessages, setTypeMessages] = useState('');
  const [sortedCreatedAt, setSortedCreatedAt] = useState(null);
  const [statusMessages, setStatusMessages] = useState('');
  const [selectedRadioValue, setSelectedRadioValue] = useState('');
  const [checkboxValues, setСheckboxValues] = useState([]);

  const [topicType, setTopicType] = useState(null);

  const handleChangeRadio = e => {
    setSelectedRadioValue(e.target.value);
  };

  const handleChangeCheckbox = id => {
    setCheckboxes(prevCheckboxes => {
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
    const selectedValues = checkboxses
      .filter(checkbox => checkbox.isChecked)
      .map(checkbox => checkbox.value);
    setСheckboxValues(selectedValues);
  }, [checkboxses]);

  useEffect(() => {
    const selectedValuesString =
      checkboxValues.length > 0 ? checkboxValues.join(',') : null;

    const fetchDialogs = async () => {
      const params = {
        chat_type: typeMessages || undefined,
        ordering: sortedCreatedAt || undefined,
        status: statusMessages || undefined,
        chats: selectedValuesString || selectedRadioValue || undefined,
        topic: topicType || undefined
      };

      const { data } = await getCuratorChats(params);
      console.log(data.results);
    };

    fetchDialogs();
  }, [
    typeMessages,
    sortedCreatedAt,
    statusMessages,
    selectedRadioValue,
    checkboxValues,
    topicType
  ]);

  const handleTypeMessagesChange = event => {
    setTypeMessages(event.target.value);
  };

  const handleSortingMessagesChange = event => {
    setSortedCreatedAt(event.target.value);
  };

  const handleStatusMessagesChange = event => {
    setStatusMessages(event.target.value);
  };

  const handleChangeTopicType = event => {
    setTopicType(event.target.value);
  };
  const handleChangeRedirection = () => {};
  return (
    <div className={s.container}>
      <FilterMessages
        checkboxses={checkboxses}
        handleChangeRadio={handleChangeRadio}
        handleChangeCheckbox={handleChangeCheckbox}
        handleTypeMessagesChange={handleTypeMessagesChange}
        handleStatusMessagesChange={handleStatusMessagesChange}
        handleSortingMessagesChange={handleSortingMessagesChange}
      />
      <ControlMessages
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
