import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import RadioButton from 'components/RadioButton/RadioButton';
import CheckBoxGroup from '../../components/CheckBoxGroup/CheckBoxGroup';
import s from './FilterMessages.module.scss';

export const FilterMessages = ({
  handleChangeRadio,
  handleChangeCheckbox,
  checkboxses,
  handleTypeMessagesChange,
  handleSortingMessagesChange,
  handleStatusMessagesChange
}) => {
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
        <RadioButton handleChange={handleChangeRadio} name="Все" value="all" />
        <CheckBoxGroup
          checkboxes={checkboxses}
          handleChange={handleChangeCheckbox}
        />
      </div>
    </div>
  );
};
FilterMessages.propTypes = {
  checkboxses: PropTypes.any,
  handleChangeRadio: PropTypes.func.isRequired,
  handleChangeCheckbox: PropTypes.func.isRequired,
  handleTypeMessagesChange: PropTypes.func.isRequired,
  handleSortingMessagesChange: PropTypes.func.isRequired,
  handleStatusMessagesChange: PropTypes.func.isRequired
};
