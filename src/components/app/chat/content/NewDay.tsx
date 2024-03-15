import React, { FC } from 'react';
import s from './content.module.scss';

interface Props {
  messageTime: Date;
}

const NewDay: FC<Props> = ({ messageTime }) => {
  const formattedTime = `${
    new Intl.DateTimeFormat('ru-RU', { month: 'long' })
      .format(messageTime)
      .charAt(0)
      .toUpperCase() +
    new Intl.DateTimeFormat('ru-RU', { month: 'long' })
      .format(messageTime)
      .slice(1)
  } ${messageTime.getDate()}, ${messageTime.getFullYear()}, ${messageTime
    .toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
    .toLowerCase()}`;

  return <span className={s.newDay}>{formattedTime}</span>;
};

export default NewDay;
