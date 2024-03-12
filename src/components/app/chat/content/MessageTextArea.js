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
import { useKeycloak } from '@react-keycloak/web';
import { useRolesActions } from 'hooks/useDivideActions';
import { createClientMessage } from 'api/routes/clientChat';

const formatDate = date => {
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  const now = date
    .toLocaleString('en-US', options)
    .split(',')
    .map(item => item.trim());

  return {
    day: now[0],
    hour: now[3],
    date: now[1] + ', ' + now[2]
  };
};

const MessageTextArea = () => {
  const {
    messagesDispatch,
    messages,
    threadsDispatch,
    currentThread,
    setScrollToBottom,
    isOpenThreadInfo
  } = useContext(ChatContext);
  const [previewEmoji, setPreviewEmoji] = useState(false);
  const [message, setMessage] = useState('');
  const [documents, setDocuments] = useState([]);

  const { keycloak } = useKeycloak();
  const divideAction = useRolesActions();

  const {
    config: { isDark }
  } = useAppContext();

  const addEmoji = e => {
    let emoji = e.native;
    setMessage(message + emoji);
    setPreviewEmoji(false);
  };

  const sendCuratorMessage = async () => {
    const formData = new FormData();

    documents.forEach(file => {
      formData.append('files', file);
    });
    formData.append('text', message);
    formData.append('message_type', 'file');
    formData.append('chat', currentThread.topic.id);

    return await createCuratorMessage(formData);
  };

  const sendClientMessage = () => {
    return createClientMessage({
      text: message,
      message_type: 'text',
      files: [],
      chat: currentThread.topic.id
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const date = new Date();
    let newMessage = {
      senderUserId: 3,
      message: `${message.replace(/(?:\r\n|\r|\n)/g, '<br>')}`,
      status: 'delivered',
      time: formatDate(date)
    };

    if (message) {
      const { data } = await divideAction(
        sendClientMessage,
        sendCuratorMessage
      );

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
    }
    setMessage('');
    setScrollToBottom(true);
  };

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

  const handleInputFiles = event => {
    setDocuments(prevDocuments => [
      ...prevDocuments,
      ...fileListToFiles(event.target.files)
    ]);
  };

  return (
    <Form className="chat-editor-area" onSubmit={handleSubmit}>
      <TextareaAutosize
        minRows={1}
        maxRows={6}
        disabled={currentThread?.status === 'closed'}
        value={message}
        placeholder="Написать сообщение..."
        onChange={({ target }) => setMessage(target.value)}
        className="form-control outline-none resize-none rounded-0 border-0 emojiarea-editor"
      />

      <Form.Group controlId="chatFileUpload">
        <Form.Label className="chat-file-upload cursor-pointer">
          <FontAwesomeIcon icon="paperclip" />
        </Form.Label>

        <Form.Control
          onChange={handleInputFiles}
          type="file"
          className="d-none"
        />
      </Form.Group>

      <Button
        variant="link"
        className="emoji-icon "
        onClick={() => setPreviewEmoji(!previewEmoji)}
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
