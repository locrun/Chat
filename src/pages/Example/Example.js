import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Chat from 'components/app/chat/Chat';

import ProfileUserCard from 'components/ProfileUserCard/ProfileUserCard';
import MessageStarting from 'components/message-starting/MessageStarting';

import Search from 'components/doc-components/Search';

import { LittleMenu } from 'components/littleMenu';

export const Example = () => {
  const LITTLEMENU = [
    { item: 'Аналитика продаж', href: '#', eventKey: 'sal' },
    { item: 'Аналитика обучения', eventKey: 'ler' }
  ];

  return (
    <div
      style={{
        maxWidth: '1480px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Навигация</h3>
        <Link to="http://localhost:3000/chat-topic">
          Раздел для новых сообщений -
        </Link>

        <Link to="http://localhost:3000/admin-chat">
          Стартовая страница сообщений (Админка)
        </Link>

        <Link to="http://localhost:3000/student-profile">
          Чат с карточкой студента (Админка) -
        </Link>
        <Link to="http://localhost:3000/student-chat">Чат студента</Link>
      </div>

      <div style={{ maxWidth: '285px' }}>
        <ProfileUserCard />
      </div>

      <div style={{ width: '854px' }}>
        <Chat />
      </div>
      <MessageStarting />
      <div style={{ width: '100%' }}>
        <Search />
      </div>
      <Container>
        <Row>
          <Col
            md={6}
            lg={4}
            sm={8}
            xs={9}
            className="p-1"
            style={{ backgroundColor: '#ffffff' }}
          >
            <LittleMenu
              dashboard={LITTLEMENU}
              dashboadOnSelect={console.log}
              sales={LITTLEMENU}
              salesOnSelect={console.log}
              learns={LITTLEMENU}
              learnsOnSelect={console.log}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
