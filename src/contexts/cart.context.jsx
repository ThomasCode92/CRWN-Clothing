import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.util';

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
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

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'ADD_TO_CART',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer!`);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItems = newCartItems => {
    const newCartCount = newCartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    const newCartTotal = newCartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    const action = createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    });

    dispatch(action);
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

  const setIsCartOpen = isOpen => {
    const action = createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);
    dispatch(action);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
