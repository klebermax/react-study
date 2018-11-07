import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import ProductInfo from './product_info';
import ProductImages from './product_images';

import { connect } from 'react-redux';

import { addToCart } from '../../actions/user_actions';
import { getProductDetail, clearProductDetail } from '../../actions/products_actions';

class ProductDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProductDetail(id).then(response => {
      if (!this.props.products.prodDetail) {
        this.props.history.push('/');
      }
    });
  }

  componentWillUnmount() {
    this.props.clearProductDetail();
  }

  addToCartHandler(id) {
    this.props.addToCart(id);
  }

  render() {
    return (
      <div>
        <PageTop title="Product detail" />
        <div className="container">
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: '500px' }}>
                  <ProductImages detail={this.props.products.prodDetail[0]} />
                </div>
              </div>
              <div className="right">
                <ProductInfo addToCart={id => this.addToCartHandler(id)} detail={this.props.products.prodDetail} />
              </div>
            </div>
          ) : (
            'Loading'
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getProductDetail, clearProductDetail, addToCart }
)(ProductDetail);
