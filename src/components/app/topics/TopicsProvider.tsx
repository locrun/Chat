import { getTopicsList } from 'api/routes/clientChat';
import React, { useState, useEffect } from 'react';
import { Topics } from 'types/topics';

export const TopicsContext = React.createContext<{
  isLoading: boolean;
  topics: Topics[];
  setTopics: React.Dispatch<React.SetStateAction<Topics[]>>;
} | null>(null);

export interface TopicsProviderProps {
  children: React.ReactNode;
}

export interface TopicsContextType {
  topics: Topics[];
  setTopics: React.Dispatch<React.SetStateAction<Topics[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopicsProvider = ({ children }: TopicsProviderProps) => {
  const [topics, setTopics] = useState<Topics[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTopicsList = async () => {
      setIsLoading(true);
      const { results: data } = (await getTopicsList({})).data;
      if (data) {
        setTopics(data);
        setIsLoading(false);
      }
    };
    fetchTopicsList();
  }, []);

  return (
    <TopicsContext.Provider value={{ isLoading, topics, setTopics }}>
      {children}
    </TopicsContext.Provider>
  );
};
export default TopicsProvider;
