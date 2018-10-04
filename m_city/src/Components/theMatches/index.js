import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc';

import LeagueTable from './table';
import MatchesList from './matchesList';

class TheMatches extends Component {
  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playedFilter: 'All',
    resultFilter: 'All'
  };

  componentDidMount() {
    firebaseMatches.once('value').then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      });
    });
  }

  showMatches = played => {
    const filteredMatches = this.state.matches.filter(match => {
      return played === 'All' ? true : match.final === played;
    });

    this.setState({
      filterMatches: filteredMatches,
      playedFilter: played,
      resultFilter: 'All'
    });
  };

  showResult = result => {
    const filteredMatches = this.state.matches.filter(match => {
      return result === 'All' ? true : match.result === result;
    });

    this.setState({
      filterMatches: filteredMatches,
      resultFilter: result,
      playedFilter: 'All'
    });
  };

  render() {
    const state = this.state;

    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">Show Match</div>
                <div className="cont">
                  <div
                    className={`option ${state.playedFilter === 'All' ? 'active' : ''}`}
                    onClick={() => this.showMatches('All')}
                  >
                    All
                  </div>
                  <div
                    className={`option ${state.playedFilter === 'Yes' ? 'active' : ''}`}
                    onClick={() => this.showMatches('Yes')}
                  >
                    Played
                  </div>
                  <div
                    className={`option ${state.playedFilter === 'No' ? 'active' : ''}`}
                    onClick={() => this.showMatches('No')}
                  >
                    Not played
                  </div>
                </div>
              </div>
              <div className="match_filters_box">
                <div className="tag">Result Game</div>
                <div className="cont">
                  <div
                    className={`option ${state.resultFilter === 'All' ? 'active' : ''}`}
                    onClick={() => this.showResult('All')}
                  >
                    All
                  </div>
                  <div
                    className={`option ${state.resultFilter === 'W' ? 'active' : ''}`}
                    onClick={() => this.showResult('W')}
                  >
                    Win
                  </div>
                  <div
                    className={`option ${state.resultFilter === 'L' ? 'active' : ''}`}
                    onClick={() => this.showResult('L')}
                  >
                    Loss
                  </div>
                  <div
                    className={`option ${state.resultFilter === 'D' ? 'active' : ''}`}
                    onClick={() => this.showResult('D')}
                  >
                    Draw
                  </div>
                </div>
              </div>
            </div>
            <MatchesList matches={state.filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default TheMatches;
