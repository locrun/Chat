import React, { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ChatContext } from 'context/Context';

import Picker from '@emoji-mart/react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';

import { useAppContext } from 'Main';
import { createCuratorMessage } from 'api/routes/curatorChat';
import { createClientMessage } from 'api/routes/clientChat';
import { checkRoles } from 'helpers/checkRoles';
import { INPUT_FILE_FORMATS } from 'constants';

const MessageTextArea = () => {
  const {
    socketChatStatus,
    messagesDispatch,
    threadsDispatch,
    currentThread,
    setScrollToBottom,
    isOpenThreadInfo,
    isChatClosed,
    setIsChatClose
  } = useContext(ChatContext);
  const [previewEmoji, setPreviewEmoji] = useState(false);
  const [message, setMessage] = useState('');
  const [documents, setDocuments] = useState([]);
  const isClosedChat = socketChatStatus?.data.status === 'closed';

  const isInputAndButtonDisabled =
    isChatClosed ||
    !currentThread ||
    (isClosedChat && socketChatStatus?.data.chat_id === currentThread.id);

  const {
    config: { isDark }
  } = useAppContext();

  const addEmoji = e => {
    let emoji = e.native;
    setMessage(message + emoji);
    setPreviewEmoji(false);
  };

  const isClient = checkRoles();

  const sendCuratorMessage = async (files = []) => {
    const formData = new FormData();
    let messageType = 'text';
    if (files.length > 0) {
      files.forEach(file => {
        formData.append('files', file);
      });
      messageType = 'file';
    }

    formData.append('text', message);
    formData.append('message_type', messageType);
    formData.append('chat', currentThread.id);

    return await createCuratorMessage(formData);
  };

  const sendClientMessage = (files = []) => {
    const formData = new FormData();
    let messageType = 'text';

    if (files.length > 0) {
      files.forEach(file => {
        formData.append('files', file);
      });
      messageType = 'file';
    }

    formData.append('text', message);
    formData.append('message_type', messageType);
    formData.append('chat', currentThread?.id);

    return createClientMessage(formData);
  };

  const sendMessage = async (files = []) => {
    const { data } = isClient
      ? await sendClientMessage(files)
      : await sendCuratorMessage(files);

    messagesDispatch({
      type: 'EDIT',
      payload: data,
      id: currentThread.id,
      isUpdatedStart: true
    });

    threadsDispatch({
      type: 'EDIT',
      payload: currentThread,
      id: currentThread.id,
      isUpdatedStart: true
    });
  };

  const handleSubmit = async e => {
    e?.preventDefault();

    if (message.length > 0 || documents.length > 0) {
      try {
        await sendMessage();
      } catch (error) {
        return console.log(error);
      } finally {
        setMessage('');
        setDocuments([]);
        setScrollToBottom(true);
      }
    }
  };

  useEffect(() => {
    if (currentThread?.status === 'closed') {
      setIsChatClose(true);
    } else {
      setIsChatClose(false);
    }
  }, [currentThread]);

  useEffect(() => {
    if (isOpenThreadInfo) {
      setPreviewEmoji(false);
    }
  }, [isOpenThreadInfo]);

  const fileListToFiles = fileList => {
    let filesArray = [];

    for (let i = 0; i < fileList.length; i++) {
      filesArray.push(fileList[i]);
    }

    return filesArray;
  };

  const handleInputFiles = async event => {
    /*  TODO: wait changes
    setDocuments(prevDocuments => [
      ...prevDocuments,
      ...fileListToFiles(event.target.files)
    ]);*/
    const files = fileListToFiles(event.target.files);
    await sendMessage(files);
    setDocuments([]);
    setScrollToBottom(true);
  };

  const acceptedTypes = INPUT_FILE_FORMATS.join(',');

  const enterHandler = event => {
    if (event.key === 'Enter') {
      if (event.ctrlKey) {
        setMessage(prevText => prevText + '\n');
        event.target.style.height = '';
        event.target.style.height = event.target.scrollHeight + 26 + 'px';
      } else {
        event.preventDefault();
        handleSubmit();
        setMessage('');
      }
    }
  };

  return (
    <Form className="chat-editor-area" onSubmit={handleSubmit}>
      <TextareaAutosize
        onKeyDown={enterHandler}
        minRows={1}
        maxRows={6}
        disabled={isInputAndButtonDisabled}
        value={message}
        placeholder="Написать сообщение..."
        onChange={({ target }) => setMessage(target.value)}
        className="scrollbar form-control outline-none resize-none rounded-0 border-0 emojiarea-editor"
      />

      <Form.Group controlId="chatFileUpload">
        <Form.Label className="chat-file-upload cursor-pointer">
          <FontAwesomeIcon icon="paperclip" />
        </Form.Label>

        <Form.Control
          onChange={handleInputFiles}
          type="file"
          className="d-none"
          accept={acceptedTypes}
          multiple
          disabled={isInputAndButtonDisabled}
        />
      </Form.Group>

      <Button
        variant="link"
        className="emoji-icon "
        onClick={() => setPreviewEmoji(!previewEmoji)}
        disabled={isInputAndButtonDisabled}
      >
        <FontAwesomeIcon
          icon={['far', 'laugh-beam']}
          onClick={() => setPreviewEmoji(!previewEmoji)}
        />
      </Button>

      {previewEmoji && (
        <div className="chat-emoji-picker" dir="ltr">
          <Picker
            set="google"
            onEmojiSelect={addEmoji}
            theme={isDark ? 'dark' : 'light'}
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
      )}

      <Button
        variant="send"
        size="sm"
        className={classNames('shadow-none', {
          'text-primary': message.length > 0
        })}
        type="submit"
        disabled={isInputAndButtonDisabled}
      >
        Отправить
      </Button>
    </Form>
  );
};

MessageTextArea.propTypes = {
  thread: PropTypes.object
};

export default MessageTextArea;
