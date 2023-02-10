import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';

import { setCartIsOpen } from '../../store/cart/cart.action';
import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCartIsOpen(false));
  }, [dispatch]);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
};

export default Checkout;
