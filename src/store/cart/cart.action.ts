import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.util';

const addCartItem = (cartItems: CartItem[], item: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], item: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== item.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], item: CartItem): CartItem[] => {
  return cartItems.filter(cartItem => cartItem.id !== item.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartIsOpen = withMatcher((isOpen: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);
});

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
  }
);

export const addItemToCart = (cartItems: CartItem[], item: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, item);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], item: CartItem) => {
  const newCartItems = removeCartItem(cartItems, item);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], item: CartItem) => {
  const newCartItems = clearCartItem(cartItems, item);
  return setCartItems(newCartItems);
};
