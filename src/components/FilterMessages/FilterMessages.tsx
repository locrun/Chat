import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import RadioButton from 'components/RadioButton/RadioButton';
import CheckBoxGroup from '../CheckBoxGroup/CheckBoxGroup';
import { CheckBoxData } from 'data/checkboxData';
import s from './FilterMessages.module.scss';

interface FilterMessagesProps {
  isChecked: boolean;
  checkboxList: CheckBoxData[];
  handleChangeRadio: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeCheckbox: (id: number) => void;
  handleTypeMessagesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSortingMessagesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleStatusMessagesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const FilterMessages = ({
  isChecked,
  checkboxList,
  handleChangeRadio,
  handleChangeCheckbox,
  handleTypeMessagesChange,
  handleSortingMessagesChange,
  handleStatusMessagesChange
}: FilterMessagesProps) => {
  const typeMessagesItems = [
    {
      item: 'Все сообщения',
      value: ''
    },
    {
      item: 'Обращения',
      value: 'topic'
    },
    {
      item: 'Заказы',
      value: 'order'
    }
  ];
  const sortingMessaggesItems = [
    {
      item: 'Старые',
      value: '-created_at'
    },
    {
      item: 'Новые',
      value: 'created_at'
    }
  ];
  const statusMessaggesItems = [
    {
      item: 'Открытые',
      value: 'open'
    },
    {
      item: 'Новые',
      value: 'new'
    },
    {
      item: 'В процессе',
      value: 'in_progress'
    },
    {
      item: 'Спам',
      value: 'spam'
    },
    {
      item: 'Закрытые',
      value: 'closed'
    }
  ];

  return (
    <div className={s.controlsWrapper}>
      <div className={s.selectGroup}>
        <div className={s.typesMessagesSelectWrapper}>
          <span className={s.label}>Типы сообщений</span>
          <Form.Select
            className={s.select}
            onChange={e => handleTypeMessagesChange(e)}
          >
            {typeMessagesItems.map(item => {
              return (
                <option key={item.value} value={item.value}>
                  {item.item}
                </option>
              );
            })}
          </Form.Select>
        </div>

        <div className={s.flex}>
          <div className={s.sortingSelectWrapper}>
            <span className={s.label}>Дата</span>
            <Form.Select
              className={s.select}
              onChange={e => handleSortingMessagesChange(e)}
            >
              <option className={s.default}>По умолчанию</option>
              {sortingMessaggesItems.map(item => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.item}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className={s.statusSelectWrapper}>
            <span className={s.label}>Статус</span>
            <Form.Select
              className={s.select}
              onChange={e => handleStatusMessagesChange(e)}
            >
              {statusMessaggesItems.map(item => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.item}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        </div>
      </div>
      <div className={s.flex}>
        <RadioButton
          checked={isChecked}
          handleChange={handleChangeRadio}
          name="Все"
          value="all"
        />
        <CheckBoxGroup
          checkboxList={checkboxList}
          handleChange={handleChangeCheckbox}
        />
      </div>
    </div>
  );
};
