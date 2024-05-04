import React from 'react';
import { Curator } from 'shared/types/curator';
import cn from 'classnames';
import s from '../CommentForm.module.scss';

export interface IComments {
  id: number;
  text: string;
  created_at: string;
  curator: Curator;
}

interface CommentListProps {
  data: IComments[];
}

export const CommentList = ({ data }: CommentListProps) => {
  const getFormattedDate = (time: string) => {
    const date = new Date(time);

    const formattedDate = date
      .toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      .replace(/\./g, '.')
      .replace(',', ' ');

    return formattedDate;
  };
  return (
    <div className={s.commentListWrapper}>
      <label className={cn(s.label, s.header)}>комментарии</label>
      <ul className={s.commentList}>
        {data.map(item => {
          return (
            <li key={item.id} className={s.commentItem}>
              <div className={s.flex}>
                <span className={s.userName}>{item.curator.name}</span>
                <span className={s.time}>
                  {getFormattedDate(item.created_at)}
                </span>
              </div>
              <span className={s.text}>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
