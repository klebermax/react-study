import React from 'react';
import Button from '@material-ui/core/Button';

import TicketIcon from '../../resources/images/icons/ticket.png';

const MyButton = props => {
  const { text, bck, color, link } = props;

  return (
    <Button
      href={link}
      variant="contained"
      size="small"
      style={{
        background: bck,
        color: color
      }}
    >
      <img src={TicketIcon} className="iconImage" alt="icon_button" />
      {text}
    </Button>
  );
};

export default MyButton;
