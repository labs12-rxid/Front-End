import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from './Tabs';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

import { mobile, tablet } from 'scss/mediaVariables';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderBottom: '1px solid #3b3b3c'
  },
  bar: {
    'box-shadow': 'none'
  },
  grow: {
    flexGrow: 1
  },
  title: {
    margin: '3px 10px 0 0',
    fontSize: '1.2rem',
    fontWeight: 'light',
    [mobile]: {
      fontSize: '12px'
    }
  },
  toolbar: {
    height: '110px',
    justifyContent: 'space-between',
    padding: '0 15px',
    [tablet]: {
      minHeight: '70px',
      height: '70px'
    }
  },
  subTitle: {
    fontWeight: 300,
    '@media (max-width: 400px)': {
      display: 'none'
    }
  },
  strong: {
    fontSize: '2.5rem',
    fontWeight: 700
  },
  titleDiv: {
    marginLeft: '20px',
    [mobile]: {
      marginLeft: '0px'
    }
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: '40px',
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  sectionDesktop: {
    display: 'flex'
  },
  profile: {
    color: '#2c419b',
    'text-decoration': 'none',
    'font-weight': 'bold',
    '&:hover': {
      color: fade('#2c419b', 0.75)
    }
  },
  greyStripe: {
    background: '#F0F3F5',
    height: '15px'
  }
}));

const Navigation = ({ location }) => {
  const classes = useStyles();

  if (location.pathname === '/' || location.pathname === 'landing') {
    return null;
  } else {
    return (
      <div>
        <div className={classes.root}>
          <AppBar position='static' className={classes.bar}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.titleDiv}>
                <Typography
                  className={classes.title}
                  variant='h2'
                  color='inherit'
                  noWrap
                >
                  <strong className={classes.strong}>RxID</strong>
                  <span className={classes.subTitle}> Pill Identifier</span>
                </Typography>
              </div>
              <div className={classes.sectionDesktop}>
                <ProfileIcon />
              </div>
            </Toolbar>
          </AppBar>
        </div>
        {location.pathname !== '/identify' ? (
          <Tabs classes='tab-navigator' />
        ) : null}
        {location.pathname === 'identify' ||
        location.pathname === '/identify/results' ? null : (
          <div className={classes.greyStripe} />
        )}
      </div>
    );
  }
};

export default withRouter(Navigation);
