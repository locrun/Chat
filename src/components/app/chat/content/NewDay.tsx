import React, { FC } from 'react';
import s from './content.module.scss';

interface Props {
  messageTime: Date;
}

const NewDay: FC<Props> = ({ messageTime }) => {
  const hours = messageTime.getHours().toString().padStart(2, '0');
  const minutes = messageTime.getMinutes().toString().padStart(2, '0');

  const formattedTime = `${
    new Intl.DateTimeFormat('ru-RU', { month: 'long' })
      .format(messageTime)
      .charAt(0)
      .toUpperCase() +
    new Intl.DateTimeFormat('ru-RU', { month: 'long' })
      .format(messageTime)
      .slice(1)
  } ${messageTime.getDate()}, ${messageTime.getFullYear()}, ${hours}:${minutes}`;

  return <span className={s.newDay}>{formattedTime}</span>;
};

export default NewDay;
