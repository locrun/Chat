import React from 'react';
import { useState } from 'react';
import Chat from 'components/app/chat/Chat';
import CheckBoxGroup from '../components/CheckBoxGroup/CheckBoxGroup';
import RadioGroup from 'components/RadioGroup/RadioGroup';
import ProfileUserCard from 'components/ProfileUserCard/ProfileUserCard';
import MessageStarting from 'components/message-starting/MessageStarting';
import { ServiceCards } from 'components/ServiceCards/ServiceCards';
import { checkbox } from 'data/checkboxses';
import Search from 'components/doc-components/Search';

export const Example = () => {
  const [checkboxses, setCheckboxes] = useState(checkbox);

  const handleChangeCheckbox = id => {
    const updatedCheckboxes = checkboxses.map(checkbox => {
      if (checkbox.id === id) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      } else {
        return checkbox;
      }
    });
    setCheckboxes(updatedCheckboxes);
  };
  const handleChangeRadio = selected => {
    console.log(selected.value);
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <ProfileUserCard />
      <ServiceCards />
      <div style={{ width: '854px' }}>
        <Chat />
      </div>
      <MessageStarting />
      <CheckBoxGroup
        checkboxes={checkboxses}
        handleChange={handleChangeCheckbox}
      />
      <RadioGroup
        button={undefined}
        selected={undefined}
        handleChange={handleChangeRadio}
        name="Все"
      />
      <Search />
    </div>
  );
};
