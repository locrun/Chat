import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';

import { ChatContext } from 'context/Context';
import profileInfo from 'assets/img/chat/ProfileInfo.svg';
import s from './content.module.scss';

const ChatContentHeader = ({ setHideSidebar, hideSidebar }) => {
  const { userStatus, currentThread, setProfileCardVisible } =
    useContext(ChatContext);
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

                <div className="fs-11 text-400">
                  {(userStatus &&
                    userStatus.data.user_id === currentThread.client.id &&
                    userStatus?.data.status) ||
                    'offline'}
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <img
                src={profileInfo}
                alt="info"
                className={s.profileInfoIcon}
                onClick={() => setProfileCardVisible(true)}
              />
            </Col>
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
