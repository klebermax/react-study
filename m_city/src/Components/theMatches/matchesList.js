import React, { Component } from 'react';

class MatchesList extends Component {
  state = {
    MatchesList: []
  };

  static getDerivedStateFromProps(props, state) {
    return (state = {
      MatchesList: props.matches
    });
  }

  render() {
    return <div>List</div>;
  }
}

export default MatchesList;
