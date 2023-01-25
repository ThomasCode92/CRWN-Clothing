import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  return (
    <div>
      <h1>Checkout Page</h1>
      <div>
        {cartItems.map(cartItem => {
          const { id, name, quantity } = cartItem;

          const incrementItemHandler = () => addItemToCart(cartItem);
          const decrementItemHandler = () => removeItemFromCart(cartItem);

          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <br />
              <span onClick={decrementItemHandler}>decrement</span>
              <span onClick={incrementItemHandler}>increment</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
