import React, { useState, useEffect } from 'react';

import { TopicCard } from './TopicCard/TopicCard';
import { getTopicsList } from 'api/routes/clientChat';
import s from './CategoriesCards.module.scss';
import { Topic } from 'types/chat';

export const CategoriesCards = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTopicsList = async () => {
      setIsLoading(true);

      const { results: data } = (await getTopicsList()).data;

      if (data) {
        setTopics(data);
        setIsLoading(false);
      }
    };
    fetchTopicsList();
  }, []);

  return (
    <div className={s.grid}>
      {isLoading && <span>...идет загрузка</span>}
      <TopicCard topics={topics} />
    </div>
  );
};
