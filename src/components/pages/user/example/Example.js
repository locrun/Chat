import React from 'react';
import SearchPanel from '../../../SearchPanel/SearchPanel';

import * as ReactBootstrap from 'react-bootstrap';
import s from './example.module.scss';

const Example = () => {
  return (
    <div>
      <SearchPanel className={s.search} />
    </div>
  );
};

export default Example;
