import React, { Component } from 'react';
import './resources/styles.css';

import Header from './components/layout/Header';
import Featured from './components/featured';
import VenueNfo from './components/venueInfo';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: '1500px', background: 'gray' }}>
        <Header />
        <Featured />
        <VenueNfo />
      </div>
    );
  }
}

export default App;
