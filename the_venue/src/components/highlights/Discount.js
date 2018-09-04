import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';

import MyButton from '../utils/MyButton';

class Discount extends Component {
  state = {
    discountStart: 0,
    discountEnd: 36
  };

  porcentage = () => {
    if (this.state.discountStart < this.state.discountEnd) {
      this.setState({ discountStart: this.state.discountStart + 1 });
    }
  };

  componentDidUpdate() {
    setTimeout(() => {
      this.porcentage();
    }, 30);
  }

  render() {
    return (
      <div className="center_wrapper">
        <div className="discount_wrapper">
          <Fade onReveal={() => this.porcentage()}>
            <div className="discount_porcentage">
              <span>{this.state.discountStart}%</span>
              <span>OFF</span>
            </div>
          </Fade>
          <Slide right>
            <div className="discount_description">
              <h3>Purchase tickets before 17th September</h3>
              <p>
                Short loin cow shoulder, filet mignon meatball pork chop flank
                ground round. Rump sirloin venison, picanha tongue swine
                landjaeger boudin. T-bone prosciutto cupim turducken kevin
                shoulder. Venison pig brisket buffalo.
              </p>

              <MyButton
                text="Purchase tickets"
                bck="#ffa800"
                color="#ffffff"
                link="http://google.com"
              />
            </div>
          </Slide>
        </div>
      </div>
    );
  }
}

export default Discount;
