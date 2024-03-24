import React, { useContext } from 'react';
import Flex from '../common/Flex';
import { Button } from 'react-bootstrap';
import { MenuPanel } from 'components/ProfileUserCard/MenuPanel/MenuPanel';
import { HeaderProfile } from './HeaderProfile/HeaderProfile';
import { BodyProfile } from './BodyProfile/BodyProfile';
import { CommentForm } from './CommentForm/CommentForm';
import { TaskForm } from './TaskForm/TaskForm';
import profileUserData from 'data/ProfileUserData/profileUserData';
// import OrderStatusCard from 'components/OrderStatusCard/OrderStatusCard';
// import orderStatusInfo from 'data/ProfileUserData/orderStatusInfo';
import s from './ProfileUserCard.module.scss';
import { CallsForm } from './CallsForm/CallsForm';
import { ChatContext } from 'context/Context';

export const ProfileUserCard = () => {
  const { currentLmsUser } = useContext(ChatContext);

  return (
    <Flex className={s.card} direction="column">
      <HeaderProfile {...currentLmsUser} {...profileUserData} />
      <div className={s.body}>
        <BodyProfile userInfo={profileUserData.infoList} {...currentLmsUser} />
        <Button variant="outline-success" className={s.submitButton}>
          Отправить данные для входа
        </Button>
        <MenuPanel />
      </div>
      {/* <OrderStatusCard {...orderStatusInfo} /> */}
      <CallsForm />
      <TaskForm />
      <CommentForm />
    </Flex>
  );
};
