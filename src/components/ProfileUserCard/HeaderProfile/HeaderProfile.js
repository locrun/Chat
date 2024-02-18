import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../common/Avatar';
import Flex from '../../common/Flex';
import { HashLink } from 'react-router-hash-link';
import { CgClose } from 'react-icons/cg';
import s from '../ProfileUserCard.module.scss';

const HeaderProfile = ({ avatar, userName, linkProfile }) => {
  return (
    <Flex alignItems="center" className={s.header}>
      <Avatar src={avatar} />
      <Flex direction="column" className={s.headerInfo}>
        <span className={s.userInfo}>{userName}</span>
        <HashLink to={linkProfile.path} className={s.link}>
          {linkProfile.name}
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
HeaderProfile.propTypes = {
  userName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  linkProfile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired
};
export default HeaderProfile;
