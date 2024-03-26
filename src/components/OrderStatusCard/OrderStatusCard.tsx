import React from 'react';

import Avatar from '../common/Avatar';
import { CgCheck } from 'react-icons/cg';
import classnames from 'classnames';
import s from './OrderStatusCard.module.scss';

interface OrderStatusInfo {
  statusId: string;
  avatar: string;
  currentStatus: string;
  name: string;
  price: number;
  date: string;
  time: string;
  statusChanged: {
    statusName: string;
    time: string;
    statusTransition?: string;
    name?: string;
    date?: string;
  };
  orderCreated: {
    statusName: string;
    time: string;
    name?: string;
    date?: string;
  };
  userAddedToGroup: {
    statusName: string;
    time: string;
    name?: string;
    date?: string;
  };
}

export const OrderStatusCard = ({
  statusId,
  avatar,
  currentStatus,
  name,
  price,
  date,
  time,
  statusChanged,
  orderCreated,
  userAddedToGroup
}: OrderStatusInfo) => {
  return (
    <div>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.orderStatus}>
            <span className={s.orderNumber}>Заказ {statusId}</span>
            <span className={s.currentStatus}>
              <CgCheck color="ffffff" className={s.check} />
              <span>{currentStatus}</span>
            </span>
          </div>
          <div className={s.infoBlock}>
            <span className={s.name}>{name}</span>
            <span className={s.price}>{price} ₽</span>
          </div>
          <span className={s.date}>
            {date} г. {time}
          </span>
        </div>

        <div className={s.changedStatus}>
          <Avatar className={s.avatar} size="m" src={avatar} />
          <div className={s.flexCol}>
            <span className={s.status}>{statusChanged.statusName}</span>
            <span className={s.statusName}>
              {statusChanged.statusTransition}
            </span>
          </div>
          <div className={s.time}>{statusChanged.time}</div>
        </div>

        <div className={s.createdOrder}>
          <Avatar className={s.avatar} size="m" src={avatar} />
          <div className={s.flexCol}>
            <span className={s.orderStatus}>{orderCreated.statusName}</span>
            <span className={s.orderName}>{orderCreated.name}</span>
          </div>

          <div className={classnames(s.flexCol, s.date)}>
            <span>{orderCreated.time}</span>
            <span>{orderCreated.date} г.</span>
          </div>
        </div>
      </div>

      <div className={s.userAddedToGroup}>
        <Avatar className={s.avatar} size="m" src={avatar} />
        <div className={s.flexCol}>
          <span className={s.status}>{userAddedToGroup.statusName}</span>
          <span className={s.statusName}>{userAddedToGroup.name}</span>
        </div>
        <div className={classnames(s.flexCol, s.date)}>
          <span>{orderCreated.time}</span>
          <span>{orderCreated.date} г.</span>
        </div>
      </div>
    </div>
  );
};
