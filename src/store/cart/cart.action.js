import { createAction } from '../../utils/reducer/reducer.util';

import { CART_ACTION_TYPES } from './cart.types';

export const setCartItems = cartItems => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
};

export const setCartIsOpen = isOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);
};

const addCartItem = (cartItems, item) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...item, quantity: 1 }];
};

const removeCartItem = (cartItems, item) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== item.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, item) => {
  return cartItems.filter(cartItem => cartItem.id !== item.id);
};

const addItemToCart = item => {
  const newCartItems = addCartItem(cartItems, item);
  updateCartItems(newCartItems);
};

const removeItemFromCart = item => {
  const newCartItems = removeCartItem(cartItems, item);
  updateCartItems(newCartItems);
};

const clearItemFromCart = item => {
  const newCartItems = clearCartItem(cartItems, item);
  updateCartItems(newCartItems);
};