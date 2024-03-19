import React from 'react';
import { TopicCard } from './TopicCard/TopicCard';

import s from './TopicList.module.scss';
import { Topics } from 'types/topics';

interface TopicsCardProps {
  topics: Topics[];
  isLoading: boolean;
}

export const TopicList = ({ topics, isLoading }: TopicsCardProps) => {
  return (
    <div className={s.grid}>
      {isLoading && <span>...идет загрузка</span>}
      <TopicCard topics={topics} />
    </div>
  );
};
