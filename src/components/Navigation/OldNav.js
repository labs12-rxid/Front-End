import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import Tabs from './Tabs';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

import { logout } from 'actions/index';
import { mobile, tablet } from 'scss/mediaVariables';

const Typography = withStyles({
  root: {
    [mobile]: {
      fontSize: '12px'
    }
  }
})(props => <MuiTypography {...props} />);

Typography.muiName = 'Typography';

const Toolbar = withStyles({
  root: {
    height: '110px',
    justifyContent: 'space-between'
  },
  regular: {
    minHeight: '70px',
    [tablet]: {
      minHeight: '70px',
      height: '70px'
    }
  },
  gutters: {
    padding: '0 15px 0 15px'
  }
})(props => <MuiToolbar {...props} />);

Toolbar.muiName = 'Toolbar';

const IconButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
})(props => <MuiIconButton {...props} />);

IconButton.muiName = 'IconButton';

const styles = theme => ({
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
    fontWeight: 'light'
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
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
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
});

class Navigation extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { classes } = this.props;

    if (
      this.props.location.pathname === '/' ||
      this.props.location.pathname === '/landing'
    ) {
      return null;
    } else {
      return (
        <div>
          <div className={classes.root}>
            <AppBar position='static' className={classes.bar}>
              <Toolbar>
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
          {this.props.location.pathname !== '/identify' ? (
            <Tabs classes='tab-navigator' />
          ) : null}
          {this.props.location.pathname === '/identify' ||
          this.props.location.pathname === '/identify/results' ? null : (
            <div className={classes.greyStripe} />
          )}
        </div>
      );
    }
  }
}

const StyledNavigation = withStyles(styles)(withRouter(Navigation));

export default connect(
  null,
  { logout }
)(StyledNavigation);
