import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">Waves</div>
          </div>
          <div className="right">
            <div className="top">links</div>
            <div className="bottom">bottom links</div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
