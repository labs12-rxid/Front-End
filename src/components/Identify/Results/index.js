import React, { useState } from 'react';
// import { connect } from 'react-redux';
import AdditionalSearchInfo from './AdditionalSearchInfo';
import SearchResult from './SearchResult';
import ViewDetails from './ViewDetails';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { desktop, tablet } from 'scss/mediaVariables';

const SearchResults = ({
  searchResults,
  addPill,
  history,
  classes,
  setData,
  setImage
}) => {
  const [pill, setPill] = useState(null);
  const [imageLink, setImageLink] = useState(null);

  // Okay, these media queries are not working. 'Display: none' is just to prove this point.

  if (pill) {
    return (
      <ViewDetails
        pill={pill}
        addPill={addPill}
        setPill={setPill}
        imageLink={imageLink}
      />
    );
  } else {
    return (
      <>
        <div className='search-results-bar'>
          <h4>Search Results:</h4>
          <Button
            variant='outlined'
            onClick={e => {
              e.preventDefault();
              history.push('/identify');
            }}
          >
            Try a new search
          </Button>
        </div>
        <div className={classes.mainStyle}>
          <div className={classes.leftStyle}>
            {searchResults &&
              searchResults
                .filter(result => {
                  return (
                    result && result.strength && result.strength[0] && result
                  );
                })
                .map(result => (
                  <SearchResult
                    key={result.product_code + result.setid}
                    result={result}
                    addPill={addPill}
                    setPill={setPill}
                    history={history}
                    setImage={setImage}
                    setImageLink={setImageLink}
                  />
                ))}
          </div>
          <AdditionalSearchInfo setData={setData} />
        </div>
      </>
    );
  }
};

const styles = theme => ({
  mainStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '86.5%',
    margin: '0 auto',
    '@media (max-width: 1200px)': {
      width: '94.5%'
    },
    [tablet]: {
      width: '100%',
      margin: '0 auto'
    }
  },
  leftStyle: {
    width: '50%',
    [desktop]: {
      margin: '0 auto',
      width: '90%'
    },
    [tablet]: {
      margin: 'none',
      width: '100%'
    }
  }
});

export default withStyles(styles)(SearchResults);
