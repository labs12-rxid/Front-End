import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMed } from 'actions';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import rxdata from 'data/rxdata.json';
const colors = rxdata.valid_colors;
const shapes = rxdata.valid_shapes;

const Swatch = ({ color }) => {
  const swatchObject = {
    background: `${color}`,
    padding: '0 12px',
    marginRight: '4px',
    minHeight: '19px'
  };
  return <span style={swatchObject} />;
};

class PillInfoModal extends Component {
  state = {
    pill: {
      user_id: localStorage.getItem('userID'),
      med_name: '',
      med_color: '',
      med_shape: '',
      med_strength: '',
      med_strength_unit: ''
    }
  };
  changeHandler = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      pill: {
        ...this.state.pill,
        [e.target.name]: e.target.value
      }
    });
  };
  render() {
    const { open, handleClose, addPill, classes } = this.props;
    const { med_name, med_color, med_shape, med_strength, med_strength_unit } =
      this.state.pill;
    return (
      <Dialog
        aria-labelledby='add-pill'
        aria-describedby='alert-dialog-description'
        keepMounted
        open={open}
        onClose={handleClose}
        className='add-manually'
        maxWidth='xl'
      >
        <Typography component='h4' className='title' id='add-pill'>
          {'ADD YOUR PILL MANUALLY'}
        </Typography>
        <div className='fields'>
          <div className='field-container'>
            <h5>Pill Name</h5>
            <TextField
              className='field'
              margin='normal'
              name='med_name'
              onChange={this.changeHandler}
              value={med_name}
              required
              variant='outlined'
            />
          </div>
          <div className='field-container'>
            <h5>Pill Color</h5>
            <FormControl variant='outlined' className='form-control'>
              <Select
                value={med_color}
                onChange={this.changeHandler}
                input={<OutlinedInput name='med_color' labelWidth={0} />}
              >
                {colors.map((color, index) => {
                  return (
                    <MenuItem key={index} value={color}>
                      <Swatch color={color} /> {color}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className='field-container'>
            <h5>Pill Shape</h5>
            <FormControl variant='outlined' className='form-control'>
              <Select
                value={med_shape}
                onChange={this.changeHandler}
                input={<OutlinedInput name='med_shape' labelWidth={0} />}
              >
                {shapes.map((shape, index) => {
                  return (
                    <MenuItem key={index} value={shape}>
                      {shape}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className='field-container'>
            <h5>Med Strength</h5>
            <TextField
              className='field'
              margin='normal'
              name='med_strength'
              type='number'
              onChange={this.changeHandler}
              value={med_strength}
              required
              variant='outlined'
            />
          </div>
          <div className='field-container'>
            <h5>Med Strength Unit</h5>
            <FormControl variant='outlined' className='form-control'>
              <Select
                value={med_strength_unit}
                onChange={this.changeHandler}
                input={
                  <OutlinedInput name='med_strength_unit' labelWidth={0} />
                }
              >
                <MenuItem value={'IU'}>{'IU'}</MenuItem>
                <MenuItem value={'mcg'}>{'mcg'}</MenuItem>
                <MenuItem value='mg'>{'mg'}</MenuItem>
                <MenuItem value={'g'}>{'g'}</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <DialogActions className={classes.actions}>
          <Button
            color='secondary'
            variant='contained'
            className={`${classes.addMed} ${classes.button}`}
            onClick={() => addPill(this.state.pill)}
          >
            Add to medication list
          </Button>
          <Button
            color='primary'
            variant='contained'
            className={`${classes.addRem} ${classes.button}`}
            onClick={() => addPill(this.state.pill, 'adddosage')}
          >
            Add and schedule dosage
          </Button>
          <Button
            variant='contained'
            className={`${classes.cancel} ${classes.button}`}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = theme => ({
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 480,
    alignSelf: 'center',
    marginTop: 30
  },
  addMed: {
    width: 210
  },
  addRem: {
    width: 230
  },
  cancel: {
    backgroundColor: 'black',
    color: 'white',
    width: 120,
    margin: '46px auto 38px auto'
  },
  button: {
    textTransform: 'none',
    fontWeight: 300,
    fontSize: '1rem'
  }
});

const StyledModal = withStyles(styles)(PillInfoModal);

export default connect(null, { addMed })(StyledModal);
