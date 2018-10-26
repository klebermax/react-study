import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import CardBlock from '../utils/card_block';

import { connect } from 'react-redux';
import { getProductsByArrival, getProductsBySell } from '../../actions/products_actions';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock title="Best Selling guitars" list={this.props.products.bySell} />
        <HomePromotion />
        <CardBlock title="New arrivals" list={this.props.products.byArrival} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Home);
