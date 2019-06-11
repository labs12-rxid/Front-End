import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import {
  fetchUser,
  fetchMeds,
  fetchRems,
  filterReminders,
  logout
} from 'actions';

const styles = theme => ({
  paper: {
    backgroundColor: '#2d90f5',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    fontSize: '1rem',
    color: 'white',
    fontWeight: '300'
  },
  profileText: {
    textAlign: 'right',
    paddingRight: '5px',
    '@media (max-width: 325px)': {
      display: 'none'
    }
  },
  lowerText: {
    fontSize: '.8rem',
    color: '#3d98f6',
    padding: '0 5px 0 5px',
    fontWeight: '300',
    cursor: 'pointer',
    '@media (max-width: 325px)': {
      display: 'none'
    }
  },
  avatar: {
    background: 'white',
    width: '50px',
    height: '50px',
    marginLeft: '8px',
    cursor: 'pointer'
  },
  link: {
    textDecoration: 'none'
  },
  pills: {
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: 'lightGreen'
    }
  }
});

class ProfileIcon extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRems = e => {
    e.preventDefault();
    this.setState({ anchorEl: null });
    this.props.history.push('/reminders');
  };

  handleProfile = e => {
    e.preventDefault();
    this.props.history.push('/user');
    this.setState({ anchorEl: null });
  };

  handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    this.props.logout();
    this.props.history.push('/');
  };

  componentDidMount() {
    this.handleInitialization();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggingIn && !this.props.loggingIn && !this.props.error) {
      this.handleInitialization();
    }
  }

  handleInitialization = () => {
    const {
      user,
      fetchUser,
      fetchMeds,
      fetchRems,
      meds,
      rems,
      filterReminders
    } = this.props;

    const userID = user.id ? user.id : localStorage.getItem('userID');

    if (!user.username && userID) {
      fetchUser(userID);
    }
    if (meds.length === 0 && userID) {
      fetchMeds(userID);
    }
    if (rems.length === 0 && userID) {
      fetchRems(userID).then(res => {
        if (this.props.rems.length > 0) {
          const startDate = moment(new Date())
            .startOf('day')
            ._d.getTime();
          const endDate = moment(new Date())
            .endOf('day')
            ._d.getTime();
          filterReminders(startDate, endDate);
        }
      });
    }
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, user, filteredRems } = this.props;

    return (
      <div>
        <Card className={classes.paper}>
          <div className={classes.profileText}>
            {user.id ? (
              <Typography className={classes.text}>
                Hello {user.first_name ? user.first_name : user.username}
              </Typography>
            ) : null}
            <Card className={classes.pills}>
              <div onClick={this.handleRems}>
                <Typography className={classes.lowerText}>
                  {filteredRems.length}{' '}
                  {filteredRems.length === 1 ? 'med' : 'meds'} today
                </Typography>
              </div>
            </Card>
          </div>
          <Avatar
            src={
              user.profile_image_url
                ? `/users/images/${user.profile_image_url}`
                : '/images/avatar-3.png'
            }
            className={classes.avatar}
            alt={user.username ? user.username : 'avatar'}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup='true'
            onClick={this.handleClick}
          />
          <button
            onClick={this.handleClick}
            style={{
              fontSize: '20px',
              userSelect: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'white',
              border: 'none',
              padding: '0px'
            }}
          >
            ▼
          </button>
        </Card>

        <Menu
          id='profileMenu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleProfile}>My Profile</MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  meds: state.medsReducer.meds,
  rems: state.remsReducer.rems,
  filteredRems: state.remsReducer.filteredRems,
  loggingIn: state.userReducer.loggingIn,
  error: state.userReducer.error
});

const StyledProfileIcon = withStyles(styles)(withRouter(ProfileIcon));

export default connect(
  mapStateToProps,
  { fetchUser, fetchMeds, fetchRems, filterReminders, logout }
)(StyledProfileIcon);
