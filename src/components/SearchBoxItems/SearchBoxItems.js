import React from 'react';
import Avatar from 'components/common/Avatar';
import tips from '../../assets/img/icons/tips.svg';
import messageIcon from '../../assets/img/icons/message_icon.svg';
import avatar from '../../assets/img/icons/testAvatar.svg';
import s from './searchItems.module.scss';
import { useNavigate } from 'react-router-dom';

const SearchItems = () => {
  let navigate = useNavigate();
  const handleMessageClick = () => navigate('/app/chat');
  const handleTipsClick = () => navigate('#');
  const handlerAvatar = () => navigate('/user/profile');
  return (
    <div className={s.items}>
      <img
        src={messageIcon}
        className={s.messageIcon}
        onClick={handleMessageClick}
      />
      <img src={tips} className={s.tips} onClick={handleTipsClick} />
      <Avatar src={avatar} className={s.avatar} onClick={handlerAvatar} />
    </div>
  );
};

export default SearchItems;
