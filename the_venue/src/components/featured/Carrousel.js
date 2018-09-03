import React from 'react';
import Slider from 'react-slick';

import slide_one from '../../resources/images/slide_one.jpg';
import slide_two from '../../resources/images/slide_two.jpg';
import slide_three from '../../resources/images/slide_three.jpg';

const Carrousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500
    //slidesToShow: 1,
    //slidesToScroll: 1
  };

  return (
    <div
      className="carrousel_wrapper"
      style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}
    >
      <Slider {...settings}>
        <div>
          <div
            style={{
              background: `url(${slide_one})`,
              height: `${window.innerHeight}px`
            }}
            className="carrousel_image"
          />
        </div>
        <div>
          <div
            style={{
              background: `url(${slide_two})`,
              height: `${window.innerHeight}px`
            }}
            className="carrousel_image"
          />
        </div>
        <div>
          <div
            style={{
              background: `url(${slide_three})`,
              height: `${window.innerHeight}px`
            }}
            className="carrousel_image"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carrousel;
