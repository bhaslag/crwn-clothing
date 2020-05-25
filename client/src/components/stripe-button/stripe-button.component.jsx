import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_Ye7HsSA0O4qurYHWZpn2H6C900EzoXyVqZ";

  //this is where the payment token would be passed to the backend for processing
const onToken = token => {
    axios({
      //url property takes current url and add /payment
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
    .then(response => {
      alert('Payment successful')
    })
    .catch( error => {
      console.log('Payment error: ', JSON.parse(error));
      alert(
        'There was an issue with your payment. Please make sure you use the provided credit card'
      );
    });
  };

  return (
    <StripeCheckout 
      label='Pay Now'
      name='CRWN Clothing Inc.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;