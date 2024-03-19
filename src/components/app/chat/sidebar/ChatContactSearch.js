import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from 'hooks/useDebaunce';
import { getClientChats } from 'api/routes/clientChat';
import { ChatContext } from 'context/Context';
import { useKeycloak } from '@react-keycloak/web';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import keycloakRealmRoles from 'helpers/keycloakRealmRoles';
import { getCuratorChats } from 'api/routes/curatorChat';

const ChatContactsSearch = () => {
  const { keycloak } = useKeycloak();
  const { threadsDispatch } = useContext(ChatContext);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const handleSearchTopic = async () => {
      try {
        if (
          checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
            keycloakRealmRoles.CHAT_USER
          ])
        ) {
          const { data } = await getClientChats({
            search: debouncedSearchTerm
          });

          threadsDispatch({
            type: 'SET_DIALOGS',
            payload: data.results
          });
        } else if (
          checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
            keycloakRealmRoles.CHAT_MANAGER
          ])
        ) {
          const { data } = await getCuratorChats({
            search: debouncedSearchTerm
          });

          threadsDispatch({
            type: 'SET_DIALOGS',
            payload: data.results
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleSearchTopic();
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
