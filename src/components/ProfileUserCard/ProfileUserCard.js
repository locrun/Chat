import React, { useContext } from 'react';
import Flex from '../common/Flex';
import { ChatContext } from 'context/Context';
import { Button } from 'react-bootstrap';
import { CallsForm } from './CallsForm/CallsForm';
import { UpdateProfileForm } from './UpdateProfileForm/UpdateProfileForm';
import { MenuPanel } from 'components/ProfileUserCard/MenuPanel/MenuPanel';
import { HeaderProfile } from './HeaderProfile/HeaderProfile';
import { BodyProfile } from './BodyProfile/BodyProfile';
import { CommentForm } from './CommentForm/CommentForm';
import { TaskForm } from './TaskForm/TaskForm';
import { Payment } from './Payment/Payment';
import profileUserData from 'data/ProfileUserData/profileUserData';
// import OrderStatusCard from 'components/OrderStatusCard/OrderStatusCard';
// import orderStatusInfo from 'data/ProfileUserData/orderStatusInfo';
import s from './ProfileUserCard.module.scss';

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
      <UpdateProfileForm />
      <Payment />
      <CallsForm />
      <TaskForm />
      <CommentForm />
    </Flex>
  );
};
