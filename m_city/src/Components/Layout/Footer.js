import React from 'react';
import CityLogo from '../ui/icons';

const Footer = () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link={false} width="50px" height="50px" />
      </div>
      <div className="footer_discl">
        Mancherster City 2018. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
