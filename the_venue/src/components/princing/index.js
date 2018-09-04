import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
import MyButton from '../utils/MyButton';

class Pricing extends Component {
  state = {
    pricesAvailable: [
      {
        price: 100,
        position: 'Balcony',
        desc:
          'Spare ribs shoulder salami beef ribs pork. Chicken bacon pork chop pork loin salami cupim flank.',
        linkTo: 'http://sales/b',
        delay: 500
      },

      {
        price: 150,
        position: 'Medium',
        desc:
          'Beef rump ham cow pork chop ribeye beef ribs. Biltong boudin ribeye landjaeger tenderloin.',
        linkTo: 'http://sales/b',
        delay: 0
      },

      {
        price: 250,
        position: 'Star',
        desc: 'Venison bacon ribeye pancetta short ribs picanha beef.',
        linkTo: 'http://sales/b',
        delay: 500
      }
    ]
  };

  showBoxes = () =>
    this.state.pricesAvailable.map((box, i) => {
      return (
        <Zoom key={i} delay={box.delay}>
          <div className="pricing_item">
            <div className="pricing_inner_wrapper">
              <div className="pricing_title">
                <span>${box.price}</span>
                <span>{box.position}</span>
              </div>
              <div className="pricing_description">{box.desc}</div>
              <div className="pricing_buttons">
                <MyButton
                  text="Purchase"
                  bck="#ffa800"
                  color="#ffffff"
                  link={box.linkTo}
                />{' '}
              </div>
            </div>
          </div>
        </Zoom>
      );
    });

  render() {
    return (
      <div className="bck_black">
        <div className="center_wrapper pricing_section">
          <h2>Pricing</h2>

          <div className="pricing_wrapper">{this.showBoxes()}</div>
        </div>
      </div>
    );
  }
}

export default Pricing;
