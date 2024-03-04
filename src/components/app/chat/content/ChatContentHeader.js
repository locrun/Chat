import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { ChatContext } from 'context/Context';

const ChatContentHeader = ({ thread, setHideSidebar, hideSidebar }) => {
  const { getUser } = useContext(ChatContext);
  const user = getUser(thread);

  return (
    <>
      {!hideSidebar && (
        <div className="chat-content-header">
          <Row className="flex-between-center">
            <Col xs={6} md={8} as={Flex} alignItems="center">
              <div
                className="pe-3 text-700 d-md-none contacts-list-show cursor-pointer"
                onClick={() => setHideSidebar(true)}
              >
                <FontAwesomeIcon icon="chevron-left" />
              </div>
              <div className="min-w-0">
                <h5 className="mb-0 text-truncate fs-9">{user.name}</h5>
                <div className="fs-11 text-400">
                  {user.status === 'status-online'
                    ? 'Active on  chat'
                    : 'Active 7h ago'}
                </div>
              </div>
            </Col>
            <Col xs="auto"></Col>
          </Row>
        </div>
      )}
    </>
  );
};

ChatContentHeader.propTypes = {
  thread: PropTypes.object.isRequired,
  setHideSidebar: PropTypes.func.isRequired,
  hideSidebar: PropTypes.bool
};

export default ChatContentHeader;
