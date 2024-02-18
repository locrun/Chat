import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../common/Avatar';
import { CgCheck } from 'react-icons/cg';
import classnames from 'classnames';
import s from './OrderStatusCard.module.scss';

const OrderStatusCard = ({
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
}) => {
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
          <Avatar className={s.avatar} size="24" src={avatar} />
          <div className={s.flexCol}>
            <span className={s.status}>{statusChanged.statusName}</span>
            <span className={s.statusName}>
              {statusChanged.statusTransition}
            </span>
          </div>
          <div className={s.time}>{statusChanged.time}</div>
        </div>

        <div className={s.createdOrder}>
          <Avatar className={s.avatar} size="24" src={avatar} />
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
        <Avatar className={s.avatar} size="24" src={avatar} />
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

const statusPropTypes = PropTypes.shape({
  statusName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  statusTransition: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string
});

OrderStatusCard.propTypes = {
  statusId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  currentStatus: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  statusChanged: statusPropTypes.isRequired,
  orderCreated: statusPropTypes.isRequired,
  userAddedToGroup: statusPropTypes.isRequired
};
export default OrderStatusCard;
