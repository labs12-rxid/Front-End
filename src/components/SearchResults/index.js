import React from 'react';
// import { connect } from 'react-redux';
import AdditionalSearchInfo from './AdditionalSearchInfo';
import SearchResult from './SearchResult';

import { tablet } from 'scss/mediaVariables';

const SearchResults = ({
  searchResults,
  handleAddPill,
  handleAddPillReminders
  // setPill,
  // pill
}) => {
  const style = {
    display: 'flex',
    maxWidth: '99%',
    justifyContent: 'space-between'
  };

  // This doesn't work for some reason, breakpoint does not want to activate
  const leftStyle = {
    width: '55%',
    [`${tablet}`]: {
      display: '85%'
    }
  };

  return (
    <div style={style}>
      <div style={leftStyle}>
        {searchResults &&
          searchResults
            .filter(result => {
              return result && result.strength && result.strength[0] && result;
            })
            .map(result => (
              <SearchResult
                key={result.product_code + result.setid}
                result={result}
                handleAddPill={handleAddPill}
                handleAddPillReminders={handleAddPillReminders}
              />
            ))}
      </div>
      <AdditionalSearchInfo />
    </div>
  );
};

export default SearchResults;
