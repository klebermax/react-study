import React from 'react';
import Header from '../Components/layout/Header';
import Footer from '../Components/layout/Footer';

const Layout = props => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
