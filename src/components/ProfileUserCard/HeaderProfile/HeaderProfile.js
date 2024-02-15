import React from 'react';
import Avatar from '../../common/Avatar';
import Flex from '../../common/Flex';
import { HashLink } from 'react-router-hash-link';
import { CgClose } from 'react-icons/cg';
import s from '../ProfileUserCard.module.scss';

const HeaderProfile = () => {
  return (
    <Flex alignItems="center" className={s.header}>
      <Avatar src={'https://perfecto-web.com/uploads/uifaces/ui-3.jpg'} />
      <Flex direction="column" className={s.headerInfo}>
        <span className={s.userInfo}>Иванов Аркадий Анатольевич</span>
        <HashLink to="/" className={s.link}>
          Профиль
        </HashLink>
      </Flex>
      <CgClose
        color="8e8e8f"
        className={s.closeButton}
        onClick={() => console.log('click')}
      />
    </Flex>
  );
};

export default HeaderProfile;
