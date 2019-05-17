import React, { useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { addMed } from 'actions';
import { useToggle } from 'utilities/useToggle';
import Button from '@material-ui/core/Button';
import Scan from './Scan/Scan.js'; // Prioritizing the Scan component
import scanReducer, { init } from './scanReducer.js';
import SearchPill from './SearchPill/SearchPill';
import PillInfoModal from 'components/Modals/PillInfoModal';
import Search from 'components/SearchResults';

function ScanOrAdd({ location, history, addMed }) {
  const [state, dispatch] = useReducer(scanReducer, init(location));
  const [open, setOpen] = useToggle(false);
  const [data, setData] = useState();
  // const [pill, setPill] = useState({});

  const handleAddPill = pillInfo => {
    addMed({
      ...pillInfo,
      med_add_date: new Date().getTime()
    })
      .then(() => {
        history.push('/pills');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddPillReminders = pillInfo => {
    addMed({
      ...pillInfo,
      med_add_date: new Date().getTime()
    })
      .then(() => {
        history.push('/adddosage');
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log(state); // purely for debugging

  return (
    <>
      {data ? (
        <Search
          searchResults={data}
          handleAddPill={handleAddPill}
          handleAddPillReminders={handleAddPillReminders}
        />
      ) : (
        <section className='scan-container'>
          <h2>Identify your Pill before scheduling</h2>
          <Scan
            state={state}
            dispatch={dispatch}
            history={history}
            setData={setData}
          />
          <SearchPill state={state} dispatch={dispatch} setData={setData} />
          <Button onClick={setOpen} variant='contained'>
            Add Pill Manually
          </Button>
          <PillInfoModal
            open={open}
            handleAddPill={handleAddPill}
            handleAddPillReminders={handleAddPillReminders}
            handleClose={setOpen}
          />
        </section>
      )}
    </>
  );
}

export default connect(
  null,
  { addMed }
)(ScanOrAdd);
