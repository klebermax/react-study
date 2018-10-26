import React from 'react';
import MyButton from './../utils/button';
import Login from './login';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              ancient alien alien anti-gravity golden disk sightings vortex targeted mutation, portal indian texts
              clearly mayan . ancient alien theorists targeted mutation extraterrestrial cover up , ancient alien
              theorists seti magnetic current choral castle , ancient civilization star gates flying vessels .
              extraterrestrial origin chariot of the gods star gates electromagnetic annunaki von daniken, seti ancient
              civilization seti mainstream archaelogy anti-gravity inter-dimensional crystal skull ufo, extraterrestrial
              annunaki mystery astronaut mayan easter island alien . />
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{ margin: '10px 0 0 0' }}
            />
          </div>
          <div className="right">
            <h1>Registered customers</h1>
            <p>If you are already have an account, proced to log in</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
