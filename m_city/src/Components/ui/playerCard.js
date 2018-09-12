import React from 'react';

const PlayerCard = props => {
  const { bck, number, firstName, lastName } = props;

  return (
    <div className="player_card_wrapper">
      <div
        className="player_card_thmb"
        style={{ background: `#f2f9ff url(${bck})` }}
      />
      <div className="player_Card_nfo">
        <div className="player_card_number">{number}</div>
        <div className="player_card_name">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
