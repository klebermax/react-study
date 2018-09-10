import React from 'react';
import Header from '../Components/Layout/Header';
import Footer from '../Components/Layout/Footer';

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
