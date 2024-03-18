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

const MessageTextArea = () => {
  const {
    messagesDispatch,
    threadsDispatch,
    currentThread,
    setScrollToBottom,
    isOpenThreadInfo
  } = useContext(ChatContext);
  const [previewEmoji, setPreviewEmoji] = useState(false);
  const [message, setMessage] = useState('');
  const [documents, setDocuments] = useState([]);

  const {
    config: { isDark }
  } = useAppContext();

  const addEmoji = e => {
    let emoji = e.native;
    setMessage(message + emoji);
    setPreviewEmoji(false);
  };

  const isClient = checkRoles();

  const sendCuratorMessage = async () => {
    const formData = new FormData();
    let messageType = 'text';

    if (documents.length > 0) {
      documents.forEach(file => {
        formData.append('files', file);
      });
      messageType = 'file';
    }

    formData.append('text', message);
    formData.append('message_type', messageType);
    formData.append('chat', currentThread.id);

    return await createCuratorMessage(formData);
  };

  const sendClientMessage = () => {
    const formData = new FormData();
    let messageType = 'text';

    if (documents.length > 0) {
      documents.forEach(file => {
        formData.append('files', file);
      });
      messageType = 'file';
    }

    formData.append('text', message);
    formData.append('message_type', messageType);
    formData.append('chat', currentThread.id);

    return createClientMessage(formData);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (message.length > 0) {
      try {
        const { data } = isClient
          ? await sendClientMessage()
          : await sendCuratorMessage();

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
      } catch (error) {
        return console.log(error);
      }
    }
    setMessage('');
    setDocuments([]);
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
