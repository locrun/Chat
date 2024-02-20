import React from 'react';
import { Toolbar } from 'components/Toolbar/Toolbar';
import { ServiceCards } from 'components/ServiceCards/ServiceCards';
import Search from 'components/doc-components/Search';
import s from './NewСonversation.module.scss';

const NewСonversation = () => {
  return (
    <div className={s.container}>
      <Toolbar />
      <div className={s.flexCol}>
        <Search />
        <ServiceCards />
      </div>
    </div>
  );
};

export default NewСonversation;
