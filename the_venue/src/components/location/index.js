import React from 'react';

const Location = () => {
  return (
    <div className="location_wrapper">
      <iframe
        title="Location"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12453.667093392554!2d-9.1507899!3d38.7082393!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xca41e1e16bbd3636!2sFarfetch!5e0!3m2!1spt-BR!2sbr!4v1536080876924"
        width="100%"
        height="500px"
        frameBorder="0"
        allowFullScreen
      />

      <div className="location_tag">
        <div>Location</div>
      </div>
    </div>
  );
};

export default Location;
