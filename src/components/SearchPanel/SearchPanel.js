import React from 'react';
import { Button } from 'react-bootstrap';
import PageHeader from 'components/common/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconComponentCard from 'components/common/FalconComponentCard';
import SearchBox from 'components/navbar/top/SearchBox';
import autoCompleteInitialItem from 'data/autocomplete/autocomplete';
import SearchItems from '../SearchBoxItems/SearchBoxItems';
import s from './search.module.scss';

const Search = ({ className = '' }) => (
  <>
    <FalconComponentCard>
      <FalconComponentCard.Body className={s.body}>
        <div className={s.searchBody}>
          <SearchBox
            autoCompleteItem={autoCompleteInitialItem}
            className={className}
          />
          <SearchItems />
        </div>
      </FalconComponentCard.Body>
    </FalconComponentCard>
  </>
);

export default Search;
