import React from 'react';
import { Dropdowns } from 'components/dropdown';
import classnames from 'classnames';
import s from './ControlMessages.module.scss';

export const ControlMessages = () => {
  const DROPDOWNITEMS = [
    {
      item: 'Открытые',
      eventKey: 'Все категории',
    },
    {
      item: 'Все сообщения',
      eventKey: 'Все сообщения',
    },
    {
      item: 'По умолчанию',
      eventKey: 'По умолчанию',
    }
  ];

  return (
    <div className={s.container}>
      <div className={s.controlsWrapper}>
        <div className={s.selectGroup}>
          <div className={classnames(s.select, s.appealsSelect)}>
            <span className={s.label}>Обращения</span>
            <Dropdowns
              type={'dropdownBtnCode'}
              items={DROPDOWNITEMS}
              title="Вопросы по работе в тройках"
              onSelect={console.log}
            />
          </div>
          <div className={classnames(s.select, s.spamSelect)}>
            <span className={s.label}>Спам</span>
            <Dropdowns
              type={'dropdownBtnCode'}
              items={DROPDOWNITEMS}
              title={'Переадресовать в'}
              onSelect={console.log}
            />
          </div>
        </div>
        <div className={s.buttons}>
          <div className={s.flexCol}>
            <span className={s.label}>Нет менеджера</span>
            <button className={s.button}>Взять себе</button>
          </div>
          <div className={s.flexCol}>
            <span className={s.label}>
              Открыт <span className={s.date}>Пн 09.10.23. 14:41</span>
            </span>
            <button className={classnames(s.button, s.openButton)}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
