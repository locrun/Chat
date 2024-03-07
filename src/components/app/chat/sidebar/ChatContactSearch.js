import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getClientChats } from 'api/routes/clientChat';
import { ChatContext } from 'context/Context';

const ChatContactsSearch = () => {
  const { threadsDispatch } = useContext(ChatContext);
  // const [value, setValue] = useState('');

  const handleSearchTopic = async e => {
    const value = e.target.value;

    try {
      const { data } = await getClientChats({ search: value });

      threadsDispatch({
        type: 'SET_DIALOGS',
        payload: data.results
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      className="contacts-search-wrapper"
      onSubmit={e => e.preventDefault()}
    >
      <Form.Group className="mb-0 position-relative d-md-none d-lg-block w-100 h-100">
        <Form.Control
          style={{ boxShadow: 'none' }}
          className="chat-contacts-search border-0 h-100"
          placeholder="Искать контакт..."
          size="sm"
          onChange={e => handleSearchTopic(e)}
        />
        <Button
          variant="transparent"
          size="sm"
          className="d-md-inline-block d-lg-none"
          type="submit"
          onClick={() => handleSearchTopic()}
        >
          {/* <FontAwesomeIcon icon="search" className="fs-10" /> */}
          <FontAwesomeIcon icon="search" className="contacts-search-icon" />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ChatContactsSearch;
