import React from 'react';
import Flex from '../../common/Flex';
import profile from 'assets/img/icons/profile.svg';
import history from 'assets/img/icons/history.svg';
import shopping from 'assets/img/icons/shopping.svg';
import taskCheck from 'assets/img/icons/taskCheck.svg';
import phone from 'assets/img/icons/phone.svg';
import edit from 'assets/img/icons/edit.svg';
import cn from 'classnames';
import s from './UserMenuPanel.module.scss';

export const MenuPanel = () => {
  return (
    <div className={s.container}>
      <Flex className={s.flex}>
        <div className={s.button}>
          <img src={profile} alt="profile" />
        </div>
        <div className={cn(s.button, s.history)}>
          <img src={history} alt="history" />
        </div>
        <div className={s.button}>
          <img src={shopping} alt="shopping" />
        </div>
      </Flex>
      <Flex className={s.flex}>
        <div className={s.button}>
          <img src={taskCheck} alt="check" />
        </div>
        <div className={s.button}>
          <img src={phone} alt="phone" />
        </div>
        <div className={s.button}>
          <img src={edit} alt="edit" />
        </div>
      </Flex>
    </div>
  );
};
