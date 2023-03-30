import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';

import Button from '../button/button.component';
import './payment-form.styles.scss';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector';

const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);

  const paymentHandler = async event => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount * 100 }),
    });

    const responseData = await response.json();
    const clientSecret = responseData.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) return alert(paymentResult.error.message);

    alert('Payment Successful');
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <div className="payment-actions">
          <Button buttonType="inverted" isLoading={isProcessingPayment}>
            Pay now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
