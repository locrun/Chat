import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from 'hooks/useDebaunce';

import { ChatContext } from 'context/Context';

const ChatContactsSearch = () => {
  const { setSearchValue } = useContext(ChatContext);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    setSearchValue(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button
          variant="transparent"
          size="sm"
          className="d-md-inline-block d-lg-none"
          type="submit"
        >
          {/* <FontAwesomeIcon icon="search" className="fs-10" /> */}
          <FontAwesomeIcon icon="search" className="contacts-search-icon" />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ChatContactsSearch;
