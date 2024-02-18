import React from 'react';
import FalconComponentCard from 'components/common/FalconComponentCard';
import SearchBox from 'components/navbar/top/SearchBox';
import autoCompleteInitialItem from 'data/autocomplete/autocomplete';
import SearchItems from '../SearchBoxItems/SearchBoxItems';
import s from './searchPanel.module.scss';

const SearchPanel = ({ className = '' }) => (
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

export default SearchPanel;
