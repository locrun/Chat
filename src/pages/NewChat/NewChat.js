import React, { useEffect } from 'react';

import { Toolbar } from 'components/Toolbar/Toolbar';
import { CategoriesCards } from 'components/CategoriesCards/CategoriesCards';
import Search from 'components/doc-components/Search';
import { getTopicsList } from 'api/routes/clientChat';
import s from './NewChat.module.scss';

const NewChat = () => {
  useEffect(() => {
    const fetchTopicsList = async () => {
      const result = await getTopicsList();
      console.log(result);
    };

    fetchTopicsList();
  }, []);

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
