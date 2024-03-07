import React from 'react';
import PropTypes from 'prop-types';

import Flex from 'components/common/Flex';
import classNames from 'classnames';

const Message = ({ message, time }) => {
  const date = new Date(time);

  const formattedTime = `${
    new Intl.DateTimeFormat('ru-RU', { month: 'long' })
      .format(date)
      .charAt(0)
      .toUpperCase() +
    new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(date).slice(1)
  } ${date.getDate()}, ${date.getFullYear()}, ${date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })}`;

  return (
    <Flex className={classNames('p-3', 'd-block')}>
      <div>
        <p>{message}</p>
        <p>{formattedTime}</p>
      </div>
    </Flex>
  );
};
Message.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  time: PropTypes.string.isRequired
};

Message.defaultProps = { status: '' };

export default Message;
