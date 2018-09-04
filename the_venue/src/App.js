import React, { Component } from 'react';
import './resources/styles.css';
import { Element } from 'react-scroll';

import Header from './components/layout/Header';
import Featured from './components/featured';
import VenueNfo from './components/venueInfo';
import Highlight from './components/highlights';
import Pricing from './components/princing';
import Location from './components/location';
import Footer from './components/layout/Footer';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: '1500px', background: 'gray' }}>
        <Header />
        <Element name="featured">
          <Featured />
        </Element>
        <Element name="venuenfo">
          <VenueNfo />
        </Element>
        <Element name="highlights">
          <Highlight />
        </Element>
        <Element name="pricing">
          <Pricing />
        </Element>
        <Element name="location">
          <Location />
        </Element>
        <Footer />
      </div>
    );
  }
}

export default App;
