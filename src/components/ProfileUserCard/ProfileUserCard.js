import React from 'react';
import Flex from '../common/Flex';
import { Button } from 'react-bootstrap';
import { MenuPanel } from 'components/ProfileUserCard/MenuPanel/MenuPanel';
import { HeaderProfile } from './HeaderProfile/HeaderProfile';
import { BodyProfile } from './BodyProfile/BodyProfile';
import OrderStatusCard from 'components/OrderStatusCard/OrderStatusCard';
import profileUserData from 'data/ProfileUserData/profileUserData';
import orderStatusInfo from 'data/ProfileUserData/orderStatusInfo';
import s from './ProfileUserCard.module.scss';

export const ProfileUserCard = () => {
  return (
    <Flex className={s.card} direction="column">
      <HeaderProfile {...profileUserData} />
      <div className={s.body}>
        <BodyProfile userInfo={profileUserData.infoList} />
        <Button variant="outline-success" className={s.submitButton}>
          Отправить данные для входа
        </Button>
        <MenuPanel />
      </div>
      <OrderStatusCard {...orderStatusInfo} />
    </Flex>
  );
};
