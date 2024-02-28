import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Chat from 'components/app/chat/Chat';
import CheckBoxGroup from '../../components/CheckBoxGroup/CheckBoxGroup';
import RadioGroup from 'components/RadioGroup/RadioGroup';
import ProfileUserCard from 'components/ProfileUserCard/ProfileUserCard';
import MessageStarting from 'components/message-starting/MessageStarting';
import { ServiceCards } from 'components/ServiceCards/ServiceCards';
import { checkbox } from 'data/checkboxses';
import Search from 'components/doc-components/Search';

import { updateChats } from 'api/routes/curatorChat';

export const Example = () => {
  useEffect(() => {
    const fetch = async () => {
      const data = await updateChats(2, {
        topic: 0
      });
      console.log(data);
    };
    fetch();
  }, []);

  const [checkboxses, setCheckboxes] = useState(checkbox);

  const handleChangeCheckbox = (id: number) => {
    const updatedCheckboxes = checkboxses.map(checkbox => {
      if (checkbox.id === id) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      } else {
        return checkbox;
      }
    });
    setCheckboxes(updatedCheckboxes);
  };
  const handleChangeRadio = (selected: any) => {
    console.log(selected.value);
  };

  return (
    <div
      style={{
        maxWidth: '1480px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Навигация</h3>
        <Link to="http://localhost:3000/new-chat">
          Раздел для новых сообщений -
        </Link>

        <Link to="http://localhost:3000/admin-chat">
          Стартовая страница сообщений (Админка)
        </Link>

        <Link to="http://localhost:3000/student-profile">
          Чат с карточкой студента (Админка) -
        </Link>
        <Link to="http://localhost:3000/student-chat">Чат студента</Link>
      </div>

      <div style={{ maxWidth: '285px' }}>
        <ProfileUserCard />
      </div>
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
      <div style={{ width: '100%' }}>
        <Search />
      </div>
    </div>
  );
};
