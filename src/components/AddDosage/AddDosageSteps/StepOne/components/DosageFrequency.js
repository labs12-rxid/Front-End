import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

const DosageFrequency = ({
  lengthOfDosage,
  dosageFrequency,
  updateDosageFrequency,
  selectedDays,
  weekdays,
  setWeekdays,
  selectedDates,
  dates,
  setDates
}) => {
  const handleDosageFrequencyChange = value => {
    if (dosageFrequency === value) {
      updateDosageFrequency('');
    } else {
      updateDosageFrequency(value);
    }
  };
  const handleWeekdayChange = weekday => e => {
    if (
      Object.values(weekdays).filter(value => value).length < lengthOfDosage
    ) {
      setWeekdays({ ...weekdays, [weekday]: e.target.checked });
    } else {
      setWeekdays({ ...weekdays, [weekday]: false });
    }
    console.log(weekdays);
    console.log(selectedDays);
  };
  const handleDateChange = date => e => {
    if (Object.values(dates).filter(value => value).length < lengthOfDosage) {
      console.log(date);
      setDates({ ...dates, [date]: e.target.checked });
    } else {
      setDates({ ...dates, [date]: false });
    }
    console.log(dates);
    console.log(selectedDates);
  };
  return (
    <CardContent className='dosage-frequency'>
      <Typography className='dosage-frequency-section-title' component='p'>
        Dosage Frequency
      </Typography>
      <div className='dosage-frequency-interface'>
        <Button
          className={
            dosageFrequency === 'daily'
              ? 'dosage-frequency-active'
              : 'dosage-frequency-inactive'
          }
          onClick={() => handleDosageFrequencyChange('daily')}
        >
          Daily
        </Button>
        <Button
          className={
            dosageFrequency === 'weekly'
              ? 'dosage-frequency-active'
              : 'dosage-frequency-inactive'
          }
          onClick={() => handleDosageFrequencyChange('weekly')}
        >
          Weekly
        </Button>
        <Button
          className={
            dosageFrequency === 'monthly'
              ? 'dosage-frequency-active'
              : 'dosage-frequency-inactive'
          }
          onClick={() => handleDosageFrequencyChange('monthly')}
        >
          Monthly
        </Button>
        <FormControl variant='outlined'>
          {dosageFrequency === 'weekly' ? (
            <div className='dosage-frequency-form'>
              <Typography className='dosage-frequency-form-title' component='p'>
                Select Weekdays
              </Typography>
              <Select
                multiple
                value={selectedDays}
                className='dosage-frequency-form-select'
                input={
                  <OutlinedInput className='dosage-frequency-form-select-input' />
                }
                renderValue={selected => (
                  <div className='dosage-frequency-form-select-display'>
                    {selected.map(value => (
                      <Chip
                        className='dosage-frequency-form-select-chip'
                        key={value}
                        label={value}
                      />
                    ))}
                  </div>
                )}
              >
                {Object.entries(weekdays).map(day => (
                  <MenuItem key={day[0]}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={day[1]}
                          onChange={handleWeekdayChange(day[0])}
                          value={day[0]}
                          color='primary'
                        />
                      }
                      label={day[0]}
                    />
                  </MenuItem>
                ))}
              </Select>
            </div>
          ) : dosageFrequency === 'monthly' ? (
            <div className='dosage-frequency-form'>
              <Typography className='dosage-frequency-form-title' component='p'>
                Select Dates
              </Typography>

              <Select
                multiple
                value={selectedDates}
                className='dosage-frequency-form-select'
                input={
                  <OutlinedInput className='dosage-frequency-form-select-input' />
                }
                renderValue={selected => (
                  <div className='dosage-frequency-form-select-display'>
                    {selected.map(value => (
                      <Chip
                        className='dosage-frequency-form-select-chip'
                        key={value}
                        label={value}
                      />
                    ))}
                  </div>
                )}
              >
                {Object.entries(dates).map(date => (
                  <MenuItem key={date[0]}>
                    <FormControlLabel
                      variant='outlined'
                      control={
                        <Checkbox
                          checked={date[1]}
                          onChange={handleDateChange(date[0])}
                          value={date[0]}
                          color='primary'
                        />
                      }
                      label={date[0]}
                    />
                  </MenuItem>
                ))}
              </Select>
            </div>
          ) : null}
        </FormControl>
      </div>
    </CardContent>
  );
};

export default DosageFrequency;
