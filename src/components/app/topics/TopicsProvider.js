import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TopicsContext } from 'context/Context';

const TopicsProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);

  const updateTopics = newTopics => {
    setTopics(newTopics);
  };

  return (
    <TopicsContext.Provider value={{ topics, updateTopics }}>
      {children}
    </TopicsContext.Provider>
  );
};

TopicsProvider.propTypes = { children: PropTypes.node };

export default TopicsProvider;
