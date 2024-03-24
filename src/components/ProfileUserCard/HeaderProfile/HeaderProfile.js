import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../common/Avatar';
import Flex from '../../common/Flex';
import { HashLink } from 'react-router-hash-link';
import { CgClose } from 'react-icons/cg';
import s from '../ProfileUserCard.module.scss';
import { ChatContext } from 'context/Context';

export const HeaderProfile = props => {
  const { setProfileCardVisible } = useContext(ChatContext);

  const { profile_image, username, avatar, userName, linkProfile } = props;

  const userAvatar = profile_image?.image_url_medium;
  return (
    <Flex alignItems="center" className={s.header}>
      <Avatar src={userAvatar ? userAvatar : profile_image} />
      <Flex direction="column" className={s.headerInfo}>
        <span className={s.userInfo}>{username ? username : userName}</span>
        <HashLink to={'/'} className={s.link}>
          {'Профиль'}
        </HashLink>
      </Flex>
      <CgClose
        color="8e8e8f"
        className={s.closeButton}
        onClick={() => setProfileCardVisible(false)}
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
