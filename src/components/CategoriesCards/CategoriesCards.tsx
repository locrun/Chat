import React, { useState, useEffect } from 'react';

import { Card } from './Card/Card';
import { getTopicsList } from 'api/routes/clientChat';
import s from './CategoriesCards.module.scss';
import { Topics } from 'shared/types/topics';

export const CategoriesCards = () => {
  const [topics, setTopics] = useState<Topics[]>([]);
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
      <Card topics={topics} />
    </div>
  );
};
