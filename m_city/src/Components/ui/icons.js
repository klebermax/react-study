import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';

const CityLogo = props => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        background: `url(${mcitylogo}) no-repeat`
      }}
    />
  );

  if (props.link) {
    return (
      <Link to={props.linkTo} className="link_logo">
        {template}
      </Link>
    );
  } else {
    return template;
  }
};

CityLogo.propTypes = {
  link: PropTypes.bool.isRequired
};

export default CityLogo;
