import React, { Component } from 'react';
import './resources/styles.css';

import Header from './components/layout/Header';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: '1500px', background: 'gray' }}>
        <Header />
        hello oooo
      </div>
    );
  }
}

export default App;
