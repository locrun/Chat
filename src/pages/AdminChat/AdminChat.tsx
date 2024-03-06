import React, { ChangeEvent, useState } from 'react';
import Chat from 'components/app/chat/Chat';

import { checkboxData } from 'data/checkboxData';

import s from './AdminChat.module.scss';
import { FilterMessages } from 'components/FilterMessages/FilterMessages';

export const AdminChat = () => {
  const [checkboxList, setCheckboxList] = useState(checkboxData);

  const [selectedRadioValue, setSelectedRadioValue] = useState('');

  const handleChangeCheckbox = (id: number) => {
    const updatedCheckboxes = checkboxList.map(checkbox => {
      if (checkbox.id === id) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      } else {
        return checkbox;
      }
    });
    setCheckboxList(updatedCheckboxes);
  };
  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(e.target.value);
  };

  const handleTypeMessagesChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  const handleSortingMessagesChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
  };

  const handleStatusMessagesChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
  };
  return (
    <div className={s.container}>
      <div className={s.controlsWrapper}>
        <FilterMessages
          checkboxList={checkboxList}
          isChecked={selectedRadioValue === 'all'}
          handleChangeRadio={handleChangeRadio}
          handleChangeCheckbox={handleChangeCheckbox}
          handleTypeMessagesChange={handleTypeMessagesChange}
          handleStatusMessagesChange={handleStatusMessagesChange}
          handleSortingMessagesChange={handleSortingMessagesChange}
        />
      </div>
      <div className={s.chatWrapper}>
        <Chat />
      </div>
    </div>
  );
};
