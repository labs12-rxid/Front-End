import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useInput } from 'utilities/useInput';
import { valid_shapes as shapes } from 'data/rxdata.json';
import { valid_colors as colors } from 'data/rxdata.json';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropdown from './Dropdown';
import parseMedStrengths from 'utilities/parseMedStrengths';

// import AddPillButton from '../Scan/SearchResults/AddPillButton';

const SearchPill = ({dispatch, ...rest}) => {
  const name = useInput();
  const imprint = useInput();
  const [color, setColor] = useState('');
  const [shape, setShape] = useState('');

  const textEndpoint = `${process.env.REACT_APP_DATA_SCIENCE}/rxdata`;

  // useEffect(() => {}, [color, shape]);
  const search = async (e) => {
    e.preventDefault();
    const query = {
      "pill_name": name
      imprint,
      shape,
      color
    };
    console.log(query);
    try {
      const results = await axios.post(textEndpoint, query);
      const parsedResults = parseMedStrengths(results.data);
      dispatch({ 'type': 'analysisResults', payload: parsedResults })
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
        value={name.value}
        onChange={name.updateValue}
        margin='normal'
      />

      <TextField
        label='imprint'
        value={imprint.value}
        onChange={imprint.updateValue}
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
