import React from 'react';
// import { HashLink } from 'react-router-hash-link';
import Flex from '../common/Flex';
import { Button } from 'react-bootstrap';
import s from './ProfileUserCard.module.scss';
import { MenuPanel } from 'components/ProfileUserCard/MenuPanel/MenuPanel';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import BodyProfile from './BodyProfile/BodyProfile';

const ProfileUserCard = () => {
  const userInfoList = [
    { id: 0, key: 'E-mail:', value: 'sybekker@gmail.com' },
    { id: 1, key: 'Telegram::', value: '@rkasha' },
    { id: 2, key: 'Баланс:', value: '70 ₽' },
    { id: 3, key: 'Телефон:', value: '+9 (725) 268-96-98' },
    { id: 4, key: 'Местное время:', value: '14:13' },
    { id: 5, key: 'Регион:', value: 'Узбекистан, Ташкент' },
    {
      id: 6,
      key: 'Курс и тариф:',
      value: 'Запад, ЛТ, МБА',
      paymentSplit: '34 362 ₽/мес на 8 частей'
    }
  ];

  return (
    <Flex className={s.card} direction="column">
      <HeaderProfile />
      <div className={s.body}>
        <BodyProfile userInfo={userInfoList} />
        <Button variant="outline-success" className={s.submitButton}>
          Отправить данные для входа
        </Button>
        <MenuPanel />
      </div>
    </Flex>
  );
};

export default ProfileUserCard;
