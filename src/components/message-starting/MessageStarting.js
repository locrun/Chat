import React from 'react';
import s from './messageStarting.module.scss';
import * as ReactBootstrap from 'react-bootstrap';
import backImg from '../../assets/img/icons/messageStarting.svg';
import cn from 'classnames';

const MessageStarting = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <img src={backImg} />
        <ReactBootstrap.Button
          variant="primary"
          className={cn('me-2 mb-1', s.button)}
        >
          Новый разговор
        </ReactBootstrap.Button>
      </div>
    </div>
  );
};

export default MessageStarting;
