import React, { useContext, useState } from 'react';
import { ChatContext } from 'context/Context';
import { Button } from 'react-bootstrap';
import { MenuPanel } from 'components/ProfileUserCard/MenuPanel/MenuPanel';
import { HeaderProfile } from './HeaderProfile/HeaderProfile';
import { BodyProfile } from './BodyProfile/BodyProfile';
import { CallsForm } from './CallsForm/CallsForm';
import { UserHistory } from './UserHistory/UserHistory';
// import { UpdateProfileForm } from './UpdateProfileForm/UpdateProfileForm';
import { TaskForm } from './TaskForm/TaskForm';
import { Payment } from './Payment/Payment';
import { CommentForm } from './CommentForm/CommentForm';
import { OrderStatusCard } from 'components/OrderStatusCard/OrderStatusCard';
import orderStatusInfo from 'data/ProfileUserData/orderStatusInfo';
import profileUserData from 'data/ProfileUserData/profileUserData';
import s from './ProfileUserCard.module.scss';

export enum ButtonType {
  profile,
  history,
  payment,
  tasks,
  comment,
  calls
}

export const ProfileUserCard = () => {
  const { currentLmsUser } = useContext(ChatContext);
  const [selectedButtonType, setSelectedButtonType] = useState<ButtonType>(
    ButtonType.history
  );
  const getByButtonType = (buttonType: ButtonType) => {
    switch (buttonType) {
      case ButtonType.profile:
        return <OrderStatusCard {...orderStatusInfo} />;
      case ButtonType.history:
        return <UserHistory />;
      case ButtonType.payment:
        return <Payment />;
      case ButtonType.tasks:
        return <TaskForm />;
      case ButtonType.comment:
        return <CommentForm />;
      case ButtonType.calls:
        return <CallsForm />;
      default:
        break;
    }
  };

  return (
    <>
      <HeaderProfile {...currentLmsUser} {...profileUserData} />
      <div className={s.card}>
        <div className={s.body}>
          <BodyProfile
            userInfo={profileUserData.infoList}
            {...currentLmsUser}
          />
          <Button variant="outline-success" className={s.submitButton}>
            Отправить данные для входа
          </Button>
          <MenuPanel
            renderByButtonType={(buttonType: ButtonType) =>
              setSelectedButtonType(buttonType)
            }
          />
        </div>

        {getByButtonType(selectedButtonType)}
      </div>
    </>
  );
};
