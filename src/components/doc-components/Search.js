import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import FalconComponentCard from 'components/common/FalconComponentCard';
import SearchBox from 'components/navbar/top/SearchBox';
import autoCompleteInitialItem from 'data/autocomplete/autocomplete';
import SearchItems from '../SearchBoxItems/SearchBoxItems';
import s from './search.module.scss';

const Search = ({ className }) => (
  <div className={s.container}>
    <FalconComponentCard className={s.card}>
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
  </div>
);

Search.propTypes = {
  className: propTypes.string.isRequired
};

export default Search;
