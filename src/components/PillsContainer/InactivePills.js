import React from 'react';
import Pill from './Pill';
import withStyles from '@material-ui/core/styles/withStyles';

const InactivePills = ({ classes, inactiveMeds, openDialog }) => {
  if (inactiveMeds.length === 0) {
    return <h2>You do not have any inactive meds.</h2>;
  } else {
    return (
      <div className={classes.meds}>
        <h3>
          Below are your inactive medications. You can either reactivate them or
          delete them.
        </h3>
        {inactiveMeds.map(med => (
          <Pill key={med.id} med={med} openDialog={openDialog} />
        ))}
      </div>
    );
  }
};

const styles = theme => ({
  meds: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

export default withStyles(styles)(InactivePills);