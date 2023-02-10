import { createAction } from '../../utils/reducer/reducer.util';

import { CART_ACTION_TYPES } from './cart.types';

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

export const addItemToCart = (cartItems, item) => {
  const newCartItems = addCartItem(cartItems, item);
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, item) => {
  const newCartItems = removeCartItem(cartItems, item);
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, item) => {
  const newCartItems = clearCartItem(cartItems, item);
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
