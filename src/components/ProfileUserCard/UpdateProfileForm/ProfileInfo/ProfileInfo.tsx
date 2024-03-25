import React from 'react';
import s from '../UpdateProfileForm.module.scss';
export const ProfileInfo = () => {
  return (
    <div className={s.profileInfoWrapper}>
      <div className={s.header}>
        <span className={s.label}>Открытый профиль</span>
      </div>
      <ul className={s.clientDataList}>
        <li className={s.listItem}>
          <span className={s.fieldName}>Регистрация</span>
          <span className={s.fieldValue}>27.07.2022</span>
        </li>
      </ul>
    </div>
  );
};
