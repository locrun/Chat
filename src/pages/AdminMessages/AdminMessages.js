import React, { useState } from 'react';
import Chat from 'components/app/chat/Chat';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import CheckBoxGroup from '../../components/CheckBoxGroup/CheckBoxGroup';
import { Dropdowns } from 'components/dropdown';
import { checkbox } from 'data/checkboxses';
import classnames from 'classnames';
import s from './AdminMessages.module.scss';

export const AdminMessages = () => {
  const [checkboxses, setCheckboxes] = useState(checkbox);
  const DROPDOWNITEMS /*: TItems[]*/ = [
    {
      item: 'Открытые',
      eventKey: 'Все категории',
      quantity: 45
    },
    {
      item: 'Все сообщения',
      eventKey: 'Все сообщения',
      quantity: 77
    },
    {
      item: 'По умолчанию',
      eventKey: 'По умолчанию',
      quantity: 77
    }
  ];
  // const [selectValue, setSelectValue] = useState(DROPDOWNITEMS[0].eventKey);
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
    <div className={s.container}>
      <div className={s.controlsWrapper}>
        <div className={s.selectGroup}>
          <div className={classnames(s.select, s.typesMessagesSelect)}>
            <span className={s.label}>Типы сообщений</span>
            <Dropdowns
              type={'dropdownBtnCode'}
              items={DROPDOWNITEMS}
              title="Все сообщения"
              onSelect={console.log}
            />
          </div>

          <div className={s.flex}>
            <div className={classnames(s.select, s.dateSelect)}>
              <span className={s.label}>Дата</span>
              <Dropdowns
                type={'dropdownBtnCode'}
                items={DROPDOWNITEMS}
                title={'По умолчанию'}
                //onSelect={setSelectValue}
              />
            </div>
            <div className={classnames(s.select, s.statusSelect)}>
              <span className={s.label}>Статус</span>
              <Dropdowns
                type={'dropdownBtnCode'}
                items={DROPDOWNITEMS}
                title={'Открытые'}
                //onSelect={setSelectValue}
              />
            </div>
          </div>
        </div>
        <div className={s.flex}>
          <RadioGroup
            button={undefined}
            selected={undefined}
            handleChange={handleChangeRadio}
            name="Все"
          />
          <CheckBoxGroup
            checkboxes={checkboxses}
            handleChange={handleChangeCheckbox}
          />
        </div>
      </div>
      <div className={s.chatWrapper}>
        <Chat />
      </div>
    </div>
  );
};
