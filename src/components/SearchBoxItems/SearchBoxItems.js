import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Avatar from 'components/common/Avatar';
import tips from '../../assets/img/icons/tips.svg';
import messageIcon from '../../assets/img/icons/message_icon.svg';
import avatar from '../../assets/img/icons/testAvatar.svg';
import s from './searchItems.module.scss';

const SearchItems = () => {
  const handleMessageClick = () => {};
  const handleTipsClick = () => {};
  return (
    <div className={s.items}>
      <img
        src={messageIcon}
        className={s.messageIcon}
        onClick={handleMessageClick}
      />
      <img src={tips} className={s.tips} onClick={handleTipsClick} />
      <Avatar src={avatar} className={s.avatar} />
    </div>
  );
};

export default SearchItems;
