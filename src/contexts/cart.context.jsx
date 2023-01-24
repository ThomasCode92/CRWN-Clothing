import { createContext, useState } from 'react';

const addCartItem = (cartItems, item) => {
  // find if cartItems contains item
  // if found, increment quantity
  // return new array with modified cartItems/ new cart item
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = item => {
    setCartItems(addCartItem(item));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
