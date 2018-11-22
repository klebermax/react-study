import React from 'react';
import UserLayout from '../../hoc/userLayout';
import MyButton from '../utils/button';

import UserHistoryBlock from '../utils/User/history_block';

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

        {userData.history ? (
          <div className="user_nfo_panel">
            <h1>History purchases</h1>
            <div className="user_product_block_wrapper">
              <UserHistoryBlock products={userData.history} />
            </div>
          </div>
        ) : null}
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
