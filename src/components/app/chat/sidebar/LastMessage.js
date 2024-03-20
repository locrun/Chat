import React from 'react';
import PropTypes from 'prop-types';
import { FileItem } from '../content/Files/FileItem';

const LastMessage = ({ lastMessage }) => {
  return (
    <>
      {lastMessage?.is_my_message && <span>Вы:&nbsp;</span>}
      {lastMessage?.message_type === 'text' && <span>{lastMessage?.text}</span>}
      {lastMessage?.message_type === 'file' && (
        <FileItem file={lastMessage?.files[0]?.file} />
      )}
    </>
  );
};
LastMessage.propTypes = {
  lastMessage: PropTypes.shape({
    text: PropTypes.string,
    is_my_message: PropTypes.bool,
    message_type: PropTypes.string,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        file: PropTypes.string.isRequired
      })
    ).isRequired
  })
};

export default LastMessage;
