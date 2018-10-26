import React from 'react';
import UserLayout from '../../hoc/userLayout';
import MyButton from '../utils/button';

const UserDashboard = ({ user }) => {
  const { userData } = user;

  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>{userData.name}</span>
            <span>{userData.lastname}</span>
            <span>{userData.email}</span>
          </div>
          <MyButton type="default" title="Edit Account Info" linkTo="/user/user_profile" />
        </div>

        <div className="user_nfo_panel">
          <h1>History purchases</h1>
          <div className="user_product_block_wrapper">history</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
