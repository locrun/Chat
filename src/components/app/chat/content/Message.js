import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import classNames from 'classnames';
import s from './content.module.scss';

const Message = ({ message, time, is_my, files, is_read }) => {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const NewTime = `${hours}:${minutes}`;

  return (
    <Flex
      className={classNames('p-3', 'd-block', {
        [s.isMyMessage]: is_my
      })}
    >
      <div>
        <div
          className={classNames(s.message, {
            [s.isMy]: is_my,
            [s.another]: !is_my
          })}
        >
          <p>{message}</p>
        </div>

        {files.map(image => {
          return (
            <img
              className={s.image}
              key={image.id}
              src={image?.file}
              alt="picture"
            />
          );
        })}
        <div
          className={classNames(s.messageFooter, {
            [s.isMyFooter]: is_my
          })}
        >
          <div className={s.time}>
            <span>{NewTime}</span>
          </div>
          {is_my &&
            (is_read ? (
              <FontAwesomeIcon icon="check-double" color="rgb(182 193 210)" />
            ) : (
              <FontAwesomeIcon icon="check" color="rgb(182 193 210)" />
            ))}
        </div>
      </div>
    </Flex>
  );
};
Message.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  time: PropTypes.string.isRequired,
  is_my: PropTypes.bool,
  files: PropTypes.array,
  is_read: PropTypes.bool
};

Message.defaultProps = { status: '' };

export default Message;
