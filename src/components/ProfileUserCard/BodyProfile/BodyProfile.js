import React from 'react';
import PropTypes from 'prop-types';
import s from '../ProfileUserCard.module.scss';

const BodyProfile = ({ userInfo }) => {
  return (
    <ul className={s.userInfoList}>
      {userInfo.map(item => {
        return (
          <li key={item.id} className={s.listItem}>
            <span className={s.key}>{item.key}</span>
            <div className={s.flex}>
              <span className={s.value}>{item.value}</span>
              {item.paymentSplit && (
                <span className={s.value}>{item.paymentSplit}</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

BodyProfile.propTypes = {
  userInfo: PropTypes.arrayOf(PropTypes.object)
};

export default BodyProfile;
