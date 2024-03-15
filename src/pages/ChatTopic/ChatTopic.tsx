import React, { useContext } from 'react';
import { TopicList } from 'components/TopicList/TopicList';

import {
  TopicsContext,
  TopicsContextType
} from 'components/app/topics/TopicsProvider';
import s from './ChatTopic.module.scss';

export const ChatTopic = () => {
  const { topics, isLoading } = useContext(TopicsContext) as TopicsContextType;

  return (
    <div className={s.container}>
      <div className={s.flexCol}>
        <TopicList isLoading={isLoading} topics={topics} />
      </div>
    </div>
  );
};
