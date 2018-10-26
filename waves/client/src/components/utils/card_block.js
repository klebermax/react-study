import React from 'react';
import Card from './card';

const CardBlock = props => {
  const renderCards = () => (props.list ? props.list.map((card, index) => <Card key={index} {...card} />) : null);

  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <div className="title">{props.title}</div> : null}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderCards()}</div>
      </div>
    </div>
  );
};

export default CardBlock;
