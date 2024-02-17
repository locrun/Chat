import React from 'react';
import Avatar from '../common/Avatar';
import { CgCheck } from 'react-icons/cg';
import cn from 'classnames';
import s from './OrderStatusCard.module.scss';

export const OrderStatusCard = () => {
  return (
    <div>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.orderStatus}>
            <span className={s.orderNumber}>Заказ #349363</span>
            <span className={s.currentStatus}>
              <CgCheck color="ffffff" className={s.check} />
              <span>Завершен</span>
            </span>
          </div>
          <div className={s.infoBlock}>
            <span className={s.name}>Мышление в консультативном процессе</span>
            <span className={s.price}>10 ₽</span>
          </div>
          <span className={s.date}>10.10.2023 г. 15:00</span>
        </div>

        <div className={s.changedStatus}>
          <Avatar
            className={s.avatar}
            size="24"
            src={'https://perfecto-web.com/uploads/uifaces/ui-3.jpg'}
          />
          <div className={s.flexCol}>
            <span className={s.status}>Статус изменен</span>
            <span className={s.statusName}>Новый → Завершен</span>
          </div>
          <div className={s.time}>22:22</div>
        </div>

        <div className={s.createdOrder}>
          <Avatar
            className={s.avatar}
            size="24"
            src={'https://perfecto-web.com/uploads/uifaces/ui-3.jpg'}
          />
          <div className={s.flexCol}>
            <span className={s.orderStatus}>Заказ создан</span>
            <span className={s.orderName}>
              Мышление в консультативном процессе
            </span>
          </div>

          <div className={cn(s.flexCol, s.date)}>
            <span>15:00</span>
            <span>10.10.23 г.</span>
          </div>
        </div>
      </div>

      <div className={s.addGroup}>
        <Avatar
          className={s.avatar}
          size="24"
          src={'https://perfecto-web.com/uploads/uifaces/ui-3.jpg'}
        />
        <div className={s.flexCol}>
          <span className={s.status}>Пользователь добавлен в группу</span>
          <span className={s.statusName}>
            Техника «Мышление в консультативном процессе»
          </span>
        </div>
        <div className={cn(s.flexCol, s.date)}>
          <span>15:00</span>
          <span>10.10.23 г.</span>
        </div>
      </div>
    </div>
  );
};
