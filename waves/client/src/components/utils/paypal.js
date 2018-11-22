import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import MyButton from '../utils/button';

import { paymentSuccess } from '../../mock/payment_return';

class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      console.log('onSuccess');

      this.props.onSuccess(payment);
    };

    const onCancel = data => {
      console.log('onCancel');

      console.log(JSON.stringify(data));
    };

    const onError = error => {
      console.log('onError');

      console.log(JSON.stringify(error));
    };

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox: 'dfgdfgdfgdfgdfgdfg',
      production: ''
    };

    return (
      <div>
        <MyButton type="payment_test" runAction={() => onSuccess(paymentSuccess)} /> -
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    );
  }
}

export default Paypal;
