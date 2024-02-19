import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import ProfileUserCard from 'components/ProfileUserCard/ProfileUserCard';
import { ServiceCards } from 'components/ServiceCards/ServiceCards';
import MessageStarting from '../../../message-starting/MessageStarting';

const Example = () => {
  return (
    <div>
      <h1>Example Page</h1>
      <ReactBootstrap.Dropdown>
        <ReactBootstrap.Dropdown.Toggle variant="falcon-default">
          Dropdown
        </ReactBootstrap.Dropdown.Toggle>
        <ReactBootstrap.Dropdown.Menu className="py-2">
          <ReactBootstrap.Dropdown.Item href="#/action-1">
            Action
          </ReactBootstrap.Dropdown.Item>
          <ReactBootstrap.Dropdown.Item href="#/action-2">
            Another action
          </ReactBootstrap.Dropdown.Item>
          <ReactBootstrap.Dropdown.Item href="#/action-3">
            Something else
          </ReactBootstrap.Dropdown.Item>
          <ReactBootstrap.Dropdown.Divider />
          <ReactBootstrap.Dropdown.Item href="#/action-4">
            Separated link
          </ReactBootstrap.Dropdown.Item>
        </ReactBootstrap.Dropdown.Menu>
      </ReactBootstrap.Dropdown>
      <MessageStarting />
      <ProfileUserCard />
      <ServiceCards />
    </div>
  );
};

export default Example;
