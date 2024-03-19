import React from 'react';
import PropTypes from 'prop-types';

const LastMessage = ({ lastMessage }) => {
  return <div>{lastMessage?.text}</div>;
};
LastMessage.propTypes = {
  lastMessage: PropTypes.shape({
    text: PropTypes.string
  })
};

export default LastMessage;
