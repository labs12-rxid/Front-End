import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions';
import Meds from '../Meds/Meds';
import Diary from '../Diary/Diary';

const Dashboard = ({ fetchUser, user }) => {
  const { username, premium, email, phone, first_name, last_name } = user;
  useEffect(() => {
    if (!user.username) {
      fetchUser(localStorage.getItem('userID'));
    }
  }, [user, fetchUser]);

  return (
    <div className='DashboardPage'>
      {username ? (
        <div className='user'>
          <h2>
            Welcome <em>{username}</em> !
          </h2>
          <h2>Account Information:</h2>
          <p>Username: {username}</p>
          <p>Account type: {premium ? 'premium' : 'trial'}</p>
          <p>Email address: {email}</p>
          <p>Phone number: {phone}</p>
          <p>First Name: {first_name}</p>
          <p>Last Name: {last_name}</p>
          <Meds user_id={user.id} />
          <Diary user_id={user.id} />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  fetchingUser: state.fetchingUser,
  error: state.error
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(Dashboard);
