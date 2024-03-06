import React, { useContext } from 'react';
import { Toolbar } from 'components/Toolbar/Toolbar';
import { TopicList } from 'components/TopicList/TopicList';
import Search from 'components/doc-components/Search';

import {
  TopicsContext,
  TopicsContextType
} from 'components/app/topics/TopicsProvider';
import s from './ChatTopic.module.scss';

export const ChatTopic = () => {
  const { topics, isLoading } = useContext(TopicsContext) as TopicsContextType;

  return (
    <div className={s.container}>
      <Toolbar />
      <div className={s.flexCol}>
        <Search />
        <TopicList isLoading={isLoading} topics={topics} />
      </div>
    </div>
  );
};
