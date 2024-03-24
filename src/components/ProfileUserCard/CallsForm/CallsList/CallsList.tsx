import React from 'react';
import cn from 'classnames';
import s from './CallsList.module.scss';

interface ICallList {
  callType: string;
  callTheme: string;
}

interface CallListProps {
  callListData: ICallList[];
}

export const CallsList = ({ callListData }: CallListProps) => {
  return (
    <div className={s.callsListWrapper}>
      <label className={cn(s.label, s.header)}>Добавленные звонки</label>
      <ul className={s.callsList}>
        {callListData.map(item => {
          return (
            <li key={item.callTheme} className={s.callItem}>
              <div className={s.flex}>
                <span className={s.callType}>{item.callType}</span>
                <span className={s.time}>09.10.23 22:22</span>
              </div>
              <span className={s.callTheme}>
                Тема звонка:&nbsp;{item.callTheme}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
