import React, { useState } from 'react';
import { useToggle } from 'utilities/useToggle';
import { withRouter } from 'react-router';
import SpinWhile from 'components/Spinner/SpinWhile';
import axios from 'axios';
import { connect } from 'react-redux';
import { valid_shapes as shapes } from 'data/rxdata.json';
import { valid_colors as colors } from 'data/rxdata.json';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropdown from './Dropdown';
import parseMedStrengths from 'utilities/parseMedStrengths';

// import AddPillButton from '../Scan/SearchResults/AddPillButton';

const SearchPill = ({ setData, ...props }) => {
  const [loading, setLoading] = useToggle();
  const [name, setName] = useState('');
  const [imprint, setImprint] = useState('');
  const [color, setColor] = useState('');
  const [shape, setShape] = useState('');

  const formEndpoint = `${process.env.REACT_APP_DATA_SCIENCE}/rxdata`;

  const resetForm = () => {
    setName('');
    setImprint('');
    setColor('');
    setShape('');
  };

  const modifyImprint = string => {
    if (Number(string)) {
      return string;
    }
    const characters = string.split('');
    let length = characters.length;
    if (Number(characters[0])) {
      for (let i = 0; i < length; i++) {
        if (!Number(characters[i])) {
          const numbers = characters.slice(0, i);
          const letters = characters.slice(i, length);
          numbers[i] = ';';
          const combined = numbers.concat(letters);
          return combined.join('');
        }
      }
    }
    if (!Number(characters[0]) && Number(characters[length - 1])) {
      for (let i = 0; i < length; i++) {
        if (Number(characters[i])) {
          const numbers = characters.slice(i, length);
          const letters = characters.slice(0, i);
          letters[i] = ';';
          const combined = letters.concat(numbers);
          return combined.join('');
        }
      }
    }
    return string;
  };

  const search = async e => {
    e.preventDefault();
    const modifiedImprint = modifyImprint(imprint);
    const query = {
      pill_name: name,
      imprint: modifiedImprint,
      shape,
      color
    };
    console.log('SEARCH QUERY: ', query);
    setLoading();
    try {
      const results = await axios.post(formEndpoint, query);
      const parsedResults = parseMedStrengths(results.data);
      setData(parsedResults);
      props.history.push(`${props.match.url}/results`);
    } catch (error) {
      setLoading();
      console.error(error);
    } // Search for pill
  };

  return (
    <section className='option2-container'>
      <div className='identify-container'>
        <h4>
          <strong>Option 2 - </strong> Identify your pill by providing either
          pill name or imprint
        </h4>
        <div className='search-container'>
          <form className='form-container' onSubmit={search}>
            <SpinWhile still={loading}>
              <div className='field-container'>
                <h5>Pill Name</h5>
                <TextField
                  value={name}
                  onChange={e => setName(e.target.value)}
                  margin='normal'
                  variant='outlined'
                  className='field'
                />
              </div>
              <div className='field-container'>
                <h5>Imprint</h5>
                <TextField
                  value={imprint}
                  onChange={e => setImprint(e.target.value)}
                  margin='normal'
                  variant='outlined'
                  className='field'
                />
              </div>
              <p>Numbers and/or Letters on the pill</p>
              <div className='field-container'>
                <h5>Pill Color</h5>
                <Dropdown
                  itemName='color'
                  itemList={colors}
                  item={color}
                  setItem={setColor}
                />
              </div>
              <div className='field-container'>
                <h5>Pill Shape</h5>
                <Dropdown
                  itemName='shape'
                  itemList={shapes}
                  item={shape}
                  setItem={setShape}
                />
              </div>
              <div className='button-container'>
                <Button
                  variant='contained'
                  className='reset-button'
                  onClick={resetForm}
                >
                  Reset form
                </Button>
                <Button
                  onClick={search}
                  type='submit'
                  variant='contained'
                  className='id-button'
                >
                  Identify Pill
                </Button>
              </div>
            </SpinWhile>
          </form>
        </div>
      </div>
      <div className='directions'>
        <h3>OPTION - 2</h3>
        <article>
          <ol>
            <li>
              Enter pill name <span>(optional).</span>
            </li>
            <li>
              Enter the imprint (code, numbers and/or letters on the pill).
            </li>
            <li>
              Select the pill color <span>(optional).</span>
            </li>
            <li>Select the shape.</li>
            <li>
              Click <strong>"Identify Pill"</strong> button.
            </li>
            <li>
              Click <strong>"Reset"</strong> to re-enter search fields.
            </li>
          </ol>
        </article>
      </div>
    </section>
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
)(withRouter(SearchPill));
