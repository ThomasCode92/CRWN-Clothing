import { createContext, useEffect, useState } from 'react';

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
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    const newCartTotal = cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    setCartCount(newCartCount);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const updateCartItems = newCartItems => {
  };

  const addItemToCart = item => {
    setCartItems(prevState => addCartItem(prevState, item));
  };

  const removeItemFromCart = item => {
    setCartItems(prevState => removeCartItem(prevState, item));
  };

  const clearItemFromCart = item => {
    setCartItems(prevState => clearCartItem(prevState, item));
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
