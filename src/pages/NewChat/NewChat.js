import React, { useEffect } from 'react';
import { Toolbar } from 'components/Toolbar/Toolbar';
import { ServiceCards } from 'components/ServiceCards/ServiceCards';
import Search from 'components/doc-components/Search';
import { getClientTopics } from 'api/routes/clientChat';
import s from './NewChat.module.scss';

const NewChat = () => {
  useEffect(() => {
    const fetchTopicsList = async () => {
      const result = await getClientTopics();
      console.log(result);
    };

    fetchTopicsList();
  }, []);

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

export default NewChat;
