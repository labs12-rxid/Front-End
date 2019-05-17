import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { valid_shapes as shapes } from 'data/rxdata.json';
import { valid_colors as colors } from 'data/rxdata.json';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropdown from './Dropdown';
import parseMedStrengths from 'utilities/parseMedStrengths';

// import AddPillButton from '../Scan/SearchResults/AddPillButton';

const SearchPill = ({data, setData, ...rest}) => {
  const [name, setName] = useState('');
  const [imprint, setImprint] = useState('');
  const [color, setColor] = useState('');
  const [shape, setShape] = useState('');

  const textEndpoint = `${process.env.REACT_APP_DATA_SCIENCE}/rxdata`;

  // useEffect(() => {}, [color, shape]);
  const search = async (e) => {
    e.preventDefault();
    const query = {
      "pill_name": name,
      imprint,
      shape,
      color
    };
    console.log(query);
    try {
      const results = await axios.post(textEndpoint, query);
      const parsedResults = parseMedStrengths(results.data);
      setData(parsedResults);
    } catch(error) {
      console.error(error);
    };
    // Search for pill
  };
  return (
    <form onSubmit={search}>
      <h4>Option 2 - Identify by direct input</h4>
      <TextField
        label='pill name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin='normal'
      />

      <TextField
        label='imprint'
        value={imprint}
        onChange={(e) => setImprint(e.target.value)}
        margin='normal'
      />

      <Dropdown itemName="color" itemList={colors} item={color} setItem={setColor} />
      <Dropdown itemName="shape" itemList={shapes} item={shape} setItem={setShape} />

      <Button onClick={search} variant='contained'>
        Identify Pill
      </Button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    pillOnDeck: state.medsReducer.pillOnDeck
  };
};

export default connect(
  mapStateToProps,
  null
)(SearchPill);
