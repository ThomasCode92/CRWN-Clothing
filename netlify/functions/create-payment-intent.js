const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async event => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return { statusCode: 200, body: JSON.stringify({ paymentIntent }) };
  } catch (error) {
    console.log(error);

    return { statusCode: 400, body: JSON.stringify({ error }) };
  }
};
