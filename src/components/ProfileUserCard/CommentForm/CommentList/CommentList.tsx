import React from 'react';

import cn from 'classnames';
import s from '../CommentForm.module.scss';
import { IComments } from 'data/comments/commnets';

interface CommentListProps {
  data: IComments[];
  title: string;
}

export const CommentList = ({ data, title }: CommentListProps) => {
  return (
    <div className={s.commentListWrapper}>
      <label className={cn(s.label, s.header)}>{title}</label>
      <ul className={s.commentList}>
        {data.map(item => {
          return (
            <li key={item.id} className={s.commentItem}>
              <div className={s.flex}>
                <span className={s.userName}>{item.userName}</span>
                <span className={s.time}>{item.time}</span>
              </div>
              <span className={s.moveDB}>{item.moveDB}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
