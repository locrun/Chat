import React from 'react';
import cn from 'classnames';
import s from './UserHistory.module.scss';

export const UserHistory = () => {
  return (
    <div className={s.historyWrapper}>
      <label className={cn(s.header, s.label)}>13.02.2024 </label>
      <ul className={s.historyList}>
        <li className={s.historyItem}>
          <div className={s.flex}>
            <span className={s.info}>Пользователь добавлен в группу</span>
            <span className={s.time}>15:45</span>
          </div>
          <span className={s.status}>Новый → Завершен</span>
        </li>
      </ul>
    </div>
  );
};
