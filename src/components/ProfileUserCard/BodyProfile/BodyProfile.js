import React from 'react';
import PropTypes from 'prop-types';
import s from '../ProfileUserCard.module.scss';

export const BodyProfile = ({ email, phone_number, country }) => {
  const userInfo = [
    { id: 0, key: 'E-mail:', value: email ? email : 'sybekker@gmail.com' },
    { id: 1, key: 'Telegram:', value: '@rkasha' },
    { id: 2, key: 'Баланс:', value: '70 ₽' },
    {
      id: 3,
      key: 'Телефон:',
      value: phone_number ? phone_number : '+9 (725) 268-96-98'
    },
    { id: 4, key: 'Местное время:', value: '14:13' },
    { id: 5, key: 'Регион:', value: country ? country : 'Узбекистан, Ташкент' },
    {
      id: 6,
      key: 'Курс и тариф:',
      value: 'Запад, ЛТ, МБА',
      paymentSplit: '34 362 ₽/мес на 8 частей'
    }
  ];
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
  userInfo: PropTypes.arrayOf(PropTypes.object),
  email: PropTypes.string,
  phone_number: PropTypes.string,
  country: PropTypes.string
};
