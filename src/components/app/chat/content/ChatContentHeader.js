import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { useConnectSocket } from 'hooks/useConnectSocket';
import { ChatContext } from 'context/Context';

const ChatContentHeader = ({ setHideSidebar, hideSidebar }) => {
  const { currentThread } = useContext(ChatContext);
  const { userStatus } = useConnectSocket();

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
                <h5 className="mb-0 text-truncate fs-9">
                  {currentThread?.topic.title}
                </h5>
                <div className="fs-11 text-400">{userStatus?.data.status}</div>
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
