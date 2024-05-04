import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import classNames from 'classnames';
import s from './content.module.scss';
import { Files } from './Files/Files';

const Message = ({
  avatar,
  message,
  files,
  time,
  is_my,
  isClient,
  isEditing,
  setIsEditing,
  editedMessage,
  setEditedMessage,
  data,
  onDeleteMessage,
  onUpdateMessage
}) => {
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
        <div className={s.messageWrapper}>
          {is_my && !isClient && (
            <div className={s.messagesOptions}>
              <FontAwesomeIcon
                icon="edit"
                className="cursor-pointer chat-option-hover"
                onClick={onUpdateMessage}
              />
              <FontAwesomeIcon
                icon="trash-alt"
                className="cursor-pointer chat-option-hover"
                onClick={onDeleteMessage}
              />
            </div>
          )}

          <div
            className={classNames(s.messageBlock, {
              [s.isMyMessage]: is_my
            })}
          >
            {!is_my && <Avatar size="l" className="me-2" src={avatar} />}

            {isEditing && is_my && data.messageId === data.id ? (
              <input
                type="text"
                value={editedMessage}
                onChange={e => setEditedMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    onUpdateMessage;
                    setIsEditing(false);
                  }
                }}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <div className={is_my ? s.myMessage : s.otherMessage}>
                {message}
              </div>
            )}
          </div>
          <Files files={files} isMy={is_my} />
        </div>
        <div
          className={classNames(s.messageFooter, {
            [s.isMyFooter]: is_my
          })}
        >
          <div className={s.time}>
            <span>{NewTime}</span>
          </div>
          {is_my &&
            (data.is_read_message || data.is_read ? (
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
  onClick: PropTypes.func,
  isClient: PropTypes.bool,
  isEditing: PropTypes.bool,
  editedMessage: PropTypes.string,
  setIsEditing: PropTypes.func,
  setEditedMessage: PropTypes.func,
  onDeleteMessage: PropTypes.func,
  onUpdateMessage: PropTypes.func,

  data: PropTypes.shape({
    id: PropTypes.number,
    messageId: PropTypes.number,
    is_read_message: PropTypes.bool,
    is_read: PropTypes.bool
  }),
  avatar: PropTypes.string
};

Message.defaultProps = { status: '' };

export default Message;
