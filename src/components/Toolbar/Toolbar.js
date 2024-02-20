import React from 'react';
import Avatar from '../common/Avatar';
import home from '../../assets/img/icons/home.svg';
import study from '../../assets/img/icons/study.svg';
import person from '../../assets/img/icons/person.svg';
import task from '../../assets/img/icons/task.svg';
import message from '../../assets/img/icons/message.svg';

import ssales from '../../assets/img/icons/ssales.svg';
import shop from '../../assets/img/icons/shop.svg';

import studance from '../../assets/img/icons/studance.svg';
import chaticum from '../../assets/img/icons/chaticum.svg';
import s from './Toolbar.module.scss';

export const Toolbar = () => {
  return (
    <div className={s.container}>
      <Avatar
        className={s.avatar}
        size="50"
        src={'https://perfecto-web.com/uploads/uifaces/ui-3.jpg'}
      />
      <div className={s.toolbar}>
        <span className={s.button}>
          <img src={home} alt="home" />
        </span>
        <span className={s.button}>
          <img src={study} alt="study" />
        </span>
        <span className={s.button}>
          <img src={person} alt="person" />
        </span>
        <span className={s.button}>
          <img src={task} alt="task" />
        </span>
        <span className={s.button}>
          <img src={message} alt="message" />
        </span>
        <span className={s.button}>
          <img src={ssales} alt="ssales" />
        </span>
        <span className={s.button}>
          <img src={shop} alt="shop" />
        </span>
        <span className={s.button}>
          <img src={studance} alt="studance" />
        </span>
        <span className={s.button}>
          <img src={chaticum} alt="chaticum" />
        </span>
      </div>
    </div>
  );
};
