import React, { FormEvent } from 'react';

import s from './UpdateProfileForm.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';

export const UpdateProfileForm = () => {
  const updateProfileHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <form className={s.form}>
        <div className={s.header}>
          <span className={s.label}>Данные клиента</span>
          <button className={s.editBtn} onClick={updateProfileHandler}>
            Редактировать
          </button>
        </div>
        <ul className={s.clientDataList}>
          <li className={s.listItem}>
            <span className={s.fieldName}>Имя</span>
            <span className={s.fieldValue}>Аркадий</span>
          </li>
        </ul>
      </form>
      <ProfileInfo />
    </>
  );
};
