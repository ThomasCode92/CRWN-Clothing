import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Button from '../button/button.component';
import './payment-form.styles.scss';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async event => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 10000 }),
    });

    const responseData = await response.json();
    const clientSecret = responseData.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: 'Test User' },
      },
    });

    if (paymentResult.error) return alert(paymentResult.error.message);

    alert('Payment Successful');
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType="inverted">Pay now</Button>
      </form>
    </div>
  );
};

export default PaymentForm;
