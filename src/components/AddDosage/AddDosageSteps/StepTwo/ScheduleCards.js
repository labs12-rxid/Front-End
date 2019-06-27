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
    <div className='schedule-card '>
      <i className={icon + ' schedule-card-icon'} />
      <div className='schedule-card-data'>
        <h3 className='schedule-card-title'>{title}</h3>
        <ul className='schedule-card-med-list'>
          {rems.map(rem => (
            <li key={rems.indexOf(rem)} className='schedule-card-med-list-item'>
              {rems.indexOf(rem) === rems.length - 1
                ? rem.name
                : rem.name + ', '}
            </li>
          ))}
        </ul>
      </div>
      <div className='schedule-card-schedule'>
        <p className='schedule-card-schedule-pills'>
          {pills + (pills === 1 ? ' pill' : ' pills')}
        </p>
        <p
          className={
            remClosestToNow - Date.now() < 0
              ? 'schedule-card-schedule-passed'
              : remClosestToNow - Date.now() < 1800000
              ? 'schedule-card-schedule-soon'
              : 'schedule-card-schedule-coming-up'
          }
        >{`${remClosestToNow - Date.now() < 0 ? 'was due ' : 'due in '}${moment(
          remClosestToNow
        ).fromNow()}`}</p>
      </div>
    </div>
  ) : null;
};

const ScheduledPillsCards = ({ filteredRems, fetchingRems, error }) => {
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
    setMorningRems([...morning]);
    setAfternoonRems([...afternoon]);
    setEveningRems([...evening]);
    setNightRems([...night]);
  }, [filteredRems]);

  return (
    <div className='schedule-cards'>
      <h2 className='schedule-cards-title'>Scheduled Meds for today</h2>
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
)(ScheduledPillsCards);
