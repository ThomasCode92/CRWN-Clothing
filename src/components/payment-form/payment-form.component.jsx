import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Button from '../button/button.component';
import './payment-form.styles.scss';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = event => {
    event.prefentDefault();

    if (!stripe || !elements) return;
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
