import React, { Component } from 'react';

import UserLayout from '../../hoc/userLayout';
import UserProductBlock from '../utils/User/product_block';
import { connect } from 'react-redux';
import { getCartItems } from '../../actions/user_actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import CircularProgress from '@material-ui/core/CircularProgress';

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    let cartItem = [];
    let user = this.props.user;

    if (user.userData.cart && user.userData.cart.length > 0) {
      user.userData.cart.forEach(item => {
        cartItem.push(item.id);
      });

      this.props.getCartItems(cartItem, user.userData.cart).then(response => {
        if (this.props.user.cartDetail.length > 0) {
          this.calculateTotal(this.props.user.cartDetail);
          this.setState({ loading: false });
        }
      });
    }
  }

  calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.forEach(item => {
      total += parseFloat(item.price) * item.quantity;
    });

    this.setState({ total, showTotal: true });
  };

  removeFromCart = () => {};

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  );

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My cart</h1>
          {this.state.loading ? (
            <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
          ) : (
            <div className="user_cart">
              <UserProductBlock products={this.props.user} type="cart" removeItem={id => this.removeFromCart(id)} />
              {this.state.showTotal ? (
                <div>
                  <div className="user_cart_sum">
                    <div>Total amount: $ {this.state.total}</div>
                  </div>
                </div>
              ) : this.state.showSuccess ? (
                <div className="cart_success">
                  <FontAwesomeIcon icon={faSmile} />
                  <div>THANK YOU</div>
                  <div>YOUR ORDER IS NOW COMPLETE</div>
                </div>
              ) : (
                this.showNoItemMessage()
              )}
            </div>
          )}
          {this.state.showTotal ? <div className="paypal_button_container">Paypal</div> : null}
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCartItems }
)(UserCart);
