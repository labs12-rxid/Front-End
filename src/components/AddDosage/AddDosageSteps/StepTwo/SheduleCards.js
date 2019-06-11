import React, { useState, useEffect } from 'react';
import Spinner from '../../../Spinner/Spinner';
import { connect } from 'react-redux';
import moment from 'moment';

const ScheduleCard = ({ rems, title, icon }) => {
  let pills = rems.map(rem => rem.capsules);
  pills = pills.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  let times = rems.map(rem => parseInt(rem.time));
  times = times.sort();
  let remClosestToNow =
    times[times.length - 1] < Date.now()
      ? times[times.length - 1]
      : times[0] > Date.now()
      ? times[0]
      : times.reduce((accumulator, currentValue) => {
          return currentValue - Date.now() > 0 &&
            currentValue - Date.now() < accumulator - Date.now()
            ? currentValue
            : accumulator;
        }, times[times.length - 1]);

  return rems.length ? (
    <div
      style={{
        display: 'flex',
        // justifyContent: 'space-between',
        width: '400px',
        height: '75px',
        margin: '15px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px 5px #f3f3f3'
      }}
    >
      <i
        className={icon}
        style={{
          lineHeight: '75px',
          fontSize: '25px',
          color: '#2D90F5',
          padding: '0 20px'
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          marginTop: '15px'
          // justifyContent: 'center'
        }}
      >
        <h3
          style={{
            alignSelf: 'flex-start',
            fontWeight: '500',
            margin: '0 0 7.5px 0'
          }}
        >
          {title}
        </h3>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '220px',
            overflow: 'hidden',
            height: '25px',
            lineHeight: '12.5px'
          }}
        >
          {rems.map(rem => (
            <li
              key={rems.indexOf(rem)}
              style={{
                overflow: 'hidden',
                fontSize: '10px',
                color: '#828384'
              }}
            >
              {rems.indexOf(rem) === rems.length - 1
                ? rem.name
                : rem.name + ', '}
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          color: '#2D90F5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100px'
        }}
      >
        <p style={{ alignSelf: 'flex-end', margin: '0 0 5px 0' }}>
          {pills + (pills === 1 ? ' pill' : ' pills')}
        </p>
        <p
          style={{
            fontSize: '10px',
            width: 'max-content',
            color: '#FFFFFF',
            alignSelf: 'flex-end',
            padding: '5px',
            borderRadius: '5px',
            background:
              remClosestToNow - Date.now() < 0
                ? '#40AB48'
                : remClosestToNow - Date.now() < 1800000
                ? '#ED3F65'
                : '#F5A623'
          }}
        >{`${remClosestToNow - Date.now() < 0 ? 'was due ' : 'due in '}${moment(
          remClosestToNow
        ).fromNow()}`}</p>
      </div>
    </div>
  ) : null;
};

const SheduledPillsCards = ({ filteredRems, fetchingRems, error }) => {
  const [morningRems, setMorningRems] = useState([]);
  const [afternoonRems, setAfternoonRems] = useState([]);
  const [eveningRems, setEveningRems] = useState([]);
  const [nightRems, setNightRems] = useState([]);
  useEffect(() => {
    console.log(filteredRems);
    const morning = [];
    const afternoon = [];
    const evening = [];
    const night = [];
    filteredRems.forEach(rem => {
      let remTime = moment(parseInt(rem.rem_date)).format('LT');
      remTime = remTime.split(' ');
      remTime[0] = remTime[0].split(':');
      remTime[0][0] = parseInt(remTime[0][0]);
      remTime[0][0] === 12 && remTime[1] === 'PM'
        ? (remTime = 12)
        : remTime[0][0] === 12 && remTime[1] === 'AM'
        ? (remTime = 0)
        : remTime[1] === 'PM'
        ? (remTime = remTime[0][0] + 12)
        : (remTime = remTime[0][0]);
      remTime < 12
        ? morning.push({
            time: rem.rem_date,
            name: rem.med_name,
            capsules: rem.med_dose / rem.med_strength
          })
        : remTime < 17
        ? afternoon.push({
            time: rem.rem_date,
            name: rem.med_name,
            capsules: rem.med_dose / rem.med_strength
          })
        : remTime < 21
        ? evening.push({
            time: rem.rem_date,
            name: rem.med_name,
            capsules: rem.med_dose / rem.med_strength
          })
        : night.push({
            time: rem.rem_date,
            name: rem.med_name,
            capsules: rem.med_dose / rem.med_strength
          });
    });
    // console.log('BIGSTRING', morningRems);
    setMorningRems([...morning]);
    setAfternoonRems([...afternoon]);
    setEveningRems([...evening]);
    setNightRems([...night]);
  }, [filteredRems]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h2
        style={{ fontSize: '25px', margin: '100px 0 0 0', fontWeight: '500' }}
      >
        Sheduled Meds for today
      </h2>
      {filteredRems.length ? (
        <div>
          <ScheduleCard
            rems={morningRems}
            title='Morning'
            icon='fas fa-coffee'
          />
          <ScheduleCard
            rems={afternoonRems}
            title='Afternoon'
            icon='fas fa-sun'
          />
          <ScheduleCard
            rems={eveningRems}
            title='Evening'
            icon='fas fa-hamburger'
          />
          <ScheduleCard rems={nightRems} title='Night' icon='fas fa-moon' />
        </div>
      ) : fetchingRems ? (
        <Spinner />
      ) : error ? (
        'there was an error fetching your pills for today'
      ) : (
        'no reminders today'
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  rems: state.remsReducer.rems,
  filteredRems: state.remsReducer.filteredRems,
  fetchingRems: state.remsReducer.fetchingRems,
  error: state.remsReducer.error
});

export default connect(
  mapStateToProps,
  null
)(SheduledPillsCards);
