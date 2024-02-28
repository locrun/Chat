import React from 'react';

import { Toolbar } from 'components/Toolbar/Toolbar';
import { CategoriesCards } from 'components/CategoriesCards/CategoriesCards';
import Search from 'components/doc-components/Search';

import s from './NewChat.module.scss';

const NewChat = () => {
  return (
    <div className={s.container}>
      <Toolbar />
      <div className={s.flexCol}>
        <Search />
        <CategoriesCards />
      </div>
    </div>
  );
};

export default NewChat;
