import React from 'react';
import { Toolbar } from 'components/Toolbar/Toolbar';
import { ServiceCard } from 'components/ServiceCard/ServiceCard';
import s from './NewConversation.module.scss';

const NewConversation = () => {
  return (
    <div className={s.container}>
      <Toolbar />
      <ServiceCard />
    </div>
  );
};

export default NewConversation;
