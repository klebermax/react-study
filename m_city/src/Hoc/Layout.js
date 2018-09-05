import React from 'react';
import Header from '../Components/Layout/Header';

const Layout = props => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
