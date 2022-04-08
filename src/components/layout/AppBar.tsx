import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Fragment, useEffect } from 'react';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import classes from './AppBar.module.css';

import {
  logout,
  showLoginForm,
  checkLoginStatus,
} from '../../store/login-slice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from './BottomNavigation';

const PrimarySearchAppBar: React.FC = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
  const tokenIsValid = useSelector(
    (state: RootState) => state.login.tokenValid
  );

  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();

  useEffect(() => {
    dispatch(checkLoginStatus());
  });

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (loggedIn && tokenIsValid) {
      setAnchorEl(event.currentTarget);
      history.push('/profile');
    } else {
      history.push('/login');
      dispatch(logout());
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const redirectToPage = () => {
    history.push(`/launch`);
  };
  const redirectToPageMissions = () => {
    history.push('/missions');
  };
  const redirectToUsersOverview = () => {
    history.push('/users-overview');
  };
  const redirectToAddUserPage = () => {
    history.push('/add-user');
  };
  const handleLogout = () => {
    history.replace('/login');
    dispatch(logout());

    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const formShowingHandler = () => {
    dispatch(showLoginForm());
    history.push('/login');
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <Box>
        <AppBar position="static">
          <Toolbar className={classes.container}>
            {loggedIn && (
              <Fragment>
                <Box className={classes['nav-items']}>
                  <IconButton
                    className={classes.item}
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={redirectToPage}
                  >
                    <RocketLaunchIcon />
                    <span>Rockets</span>
                  </IconButton>

                  <IconButton
                    className={classes.item}
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={redirectToPageMissions}
                  >
                    <ShieldIcon />
                    <span>Missions</span>
                  </IconButton>
                  <IconButton
                    className={classes.item}
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={redirectToUsersOverview}
                    color="inherit"
                  >
                    <PeopleAltIcon />
                    <span>Users</span>
                  </IconButton>
                  <IconButton
                    className={classes.item}
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={redirectToAddUserPage}
                    color="inherit"
                  >
                    <PersonAddIcon />
                    <span>Add</span>
                  </IconButton>
                  <IconButton
                    className={classes.item}
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                    <span>Account</span>
                  </IconButton>
                </Box>
              </Fragment>
            )}

            {!loggedIn && (
              <Box>
                <MenuItem data-testid="test1" onClick={formShowingHandler}>
                  Login
                </MenuItem>
              </Box>
            )}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              {loggedIn && (
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        {isMobileMenuOpen && loggedIn && renderMobileMenu}
        {isMenuOpen && loggedIn && renderMenu}
      </Box>
      {props.children}
      <Footer />
    </Fragment>
  );
};
export default PrimarySearchAppBar;
